from __future__ import annotations

"""
Chatbot Flask API — versão robusta
----------------------------------
Objetivos deste aprimoramento:
- Respostas mais precisas e determinísticas baseadas no seu JSON (custom_corpus.json).
- Segue um protocolo de resposta padronizado (schema estável de JSON).
- Interação mais natural (saudação por sessão, sugestões de perguntas, registro de dúvidas, etc.).
- Compatível com ChatterBot, mas com camada de *matching* por regras e *fuzzy* (RapidFuzz opcional) para reduzir erros.

Como usar:
- Requer Python 3.9+.
- Opcional: instalar rapidfuzz para *matching* de alta qualidade (pip install rapidfuzz). Se não estiver instalado, cai no difflib.
- Mantenha seu arquivo custom_corpus.json ao lado deste script.

Formato esperado do custom_corpus.json:
{
  "qa_pairs": [
    {
      "id": "opcional-string-estavel",
      "category": "geral",
      "questions": ["Pergunta 1", "Pergunta 1 reescrita", ...],
      "answer": "Resposta em texto ou HTML"
    },
    ...
  ]
}
Se "id" não for informado, será gerado um hash estável a partir da resposta e da primeira pergunta.
"""

import os
import re
import json
import time
import uuid
import unicodedata
from typing import Dict, List, Tuple, Optional

from flask import Flask, request, jsonify
from flask_cors import CORS

# ChatterBot segue disponível, mas será usado como fallback opcional
try:
    from chatterbot import ChatBot
    from chatterbot.trainers import ListTrainer
except Exception:  # biblioteca pode não estar instalada
    ChatBot = None  # type: ignore
    ListTrainer = None  # type: ignore

# Tenta RapidFuzz; se não houver, usa difflib
try:
    from rapidfuzz import process, fuzz  # type: ignore
    _USE_RAPIDFUZZ = True
except Exception:
    import difflib
    _USE_RAPIDFUZZ = False

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

API_VERSION = "2025-09-02"
DEFAULT_CONFIDENCE_THRESHOLD = 0.78  # limiar de aceitação da resposta
SUGGESTION_MIN_SCORE = 0.60          # limiar para exibir sugestões
GREETING_TTL_SECONDS = 60 * 60 * 12  # 12h por sessão-id

# -----------------------------
# Utilitários
# -----------------------------

def normalize(text: str) -> str:
    """Normaliza acentos, remove espaços extras e coloca em minúsculas."""
    if not isinstance(text, str):
        return ""
    t = unicodedata.normalize("NFKD", text).encode("ASCII", "ignore").decode("utf-8")
    t = re.sub(r"\s+", " ", t).strip().lower()
    return t


def stable_id(seed: str) -> str:
    """Gera um ID estável e curto a partir de uma semente."""
    import hashlib
    h = hashlib.sha256(seed.encode("utf-8")).hexdigest()[:12]
    return h


# -----------------------------
# Carregamento do corpus
# -----------------------------
BASE_DIR = os.path.dirname(__file__)
CORPUS_PATH = os.path.join(BASE_DIR, "custom_corpus.json")

class QAPair:
    __slots__ = ("id", "category", "questions", "answer")
    def __init__(self, id: str, category: str, questions: List[str], answer: str) -> None:
        self.id = id
        self.category = category or "geral"
        self.questions = questions
        self.answer = answer

qa_pairs: List[QAPair] = []
normalized_index: Dict[str, Tuple[QAPair, str]] = {}
all_normalized_questions: List[str] = []
original_by_normalized: Dict[str, str] = {}

if not os.path.exists(CORPUS_PATH):
    raise FileNotFoundError(f"Arquivo não encontrado: {CORPUS_PATH}")

with open(CORPUS_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

if "qa_pairs" not in data or not isinstance(data["qa_pairs"], list):
    raise ValueError("custom_corpus.json: campo 'qa_pairs' ausente ou inválido")

for item in data["qa_pairs"]:
    questions = item.get("questions", [])
    answer = item.get("answer", "")
    category = item.get("category", "geral")
    qid = item.get("id")

    if not questions or not answer:
        continue

    if not qid:
        seed = f"{questions[0]}||{answer[:64]}"
        qid = stable_id(seed)

    qa = QAPair(qid, category, questions, answer)
    qa_pairs.append(qa)

    for q in questions:
        n = normalize(q)
        normalized_index[n] = (qa, q)
        original_by_normalized[n] = q
        all_normalized_questions.append(n)

# -----------------------------
# Treino opcional do ChatterBot (apenas se biblioteca estiver disponível)
# -----------------------------
chatbot = None
if ChatBot is not None and ListTrainer is not None:
    try:
        chatbot = ChatBot(
            "TecnoagilBot",
            logic_adapters=["chatterbot.logic.BestMatch"],
        )
        trainer = ListTrainer(chatbot)
        # Treino leve com as perguntas/respostas para servir de fallback conversacional
        for _ in range(2):
            for qa in qa_pairs:
                for q in qa.questions:
                    trainer.train([q, qa.answer])
    except Exception:
        chatbot = None

# -----------------------------
# Mecanismo de matching
# -----------------------------

def _ratio(a: str, b: str) -> float:
    if _USE_RAPIDFUZZ:
        return fuzz.token_set_ratio(a, b) / 100.0
    # fallback simples
    return difflib.SequenceMatcher(None, a, b).ratio()


def find_best_match(user_msg: str) -> Tuple[Optional[QAPair], float, Optional[str]]:
    """
    Retorna (qa, score, matched_original_question)
    Estratégia:
      1) *Exact match* pelo texto normalizado
      2) Fuzzy com token_set_ratio (RapidFuzz) ou difflib
    """
    nmsg = normalize(user_msg)

    # 1) Exato
    if nmsg in normalized_index:
        qa, original_q = normalized_index[nmsg]
        return qa, 1.0, original_q

    # 2) Fuzzy
    if not all_normalized_questions:
        return None, 0.0, None

    if _USE_RAPIDFUZZ:
        # rápido e robusto
        match = process.extractOne(nmsg, all_normalized_questions, scorer=fuzz.token_set_ratio)
        if not match:
            return None, 0.0, None
        best_norm, score, _ = match  # score 0..100
        qa, original_q = normalized_index.get(best_norm, (None, None))
        return qa, (score / 100.0), original_q
    else:
        # difflib (mais simples/lento)
        best_norm = None
        best_score = 0.0
        for cand in all_normalized_questions:
            s = _ratio(nmsg, cand)
            if s > best_score:
                best_score = s
                best_norm = cand
        if best_norm is None:
            return None, 0.0, None
        qa, original_q = normalized_index.get(best_norm, (None, None))
        return qa, best_score, original_q


def get_suggestions(user_msg: str, k: int = 3) -> List[str]:
    nmsg = normalize(user_msg)
    if _USE_RAPIDFUZZ:
        results = process.extract(nmsg, all_normalized_questions, scorer=fuzz.token_set_ratio, limit=max(k, 3))
        out = []
        for best_norm, score, _ in results:
            if (score / 100.0) >= SUGGESTION_MIN_SCORE:
                out.append(original_by_normalized.get(best_norm, best_norm))
        # Remove duplicatas preservando ordem
        seen = set()
        dedup = []
        for q in out:
            if q not in seen:
                seen.add(q)
                dedup.append(q)
        return dedup[:k]
    else:
        # Fallback simples com difflib
        cands = difflib.get_close_matches(nmsg, all_normalized_questions, n=max(k, 5), cutoff=SUGGESTION_MIN_SCORE)
        out = [original_by_normalized.get(c, c) for c in cands]
        seen = set()
        dedup = []
        for q in out:
            if q not in seen:
                seen.add(q)
                dedup.append(q)
        return dedup[:k]


# -----------------------------
# Gestão de sessão para saudação por sessão_id
# -----------------------------
_greeted_sessions: Dict[str, float] = {}

def should_greet(session_id: Optional[str]) -> bool:
    now = time.time()
    if not session_id:
        return False
    ts = _greeted_sessions.get(session_id)
    if ts is None:
        _greeted_sessions[session_id] = now
        return True
    # limpa sessões antigas
    for sid, t0 in list(_greeted_sessions.items()):
        if now - t0 > GREETING_TTL_SECONDS:
            _greeted_sessions.pop(sid, None)
    return False


def greeting_html() -> str:
    bullets = [
        "O que é a Tecnoagil?",
        "Quais serviços vocês oferecem?",
        "Como posso entrar em contato?",
        "Qual é o horário de atendimento?",
        "Vocês oferecem suporte técnico?",
    ]
    lis = "".join(f"<li>{q}</li>" for q in bullets)
    return (
        "👋 Olá! Eu sou o assistente virtual da Tecnoagil. Como posso te ajudar?"
        "<br><br><b>Algumas sugestões de perguntas:</b><ul>" + lis + "</ul>"
    )


# -----------------------------
# Logger de perguntas não compreendidas
# -----------------------------
UNREC_LOG_PATH = os.path.join(BASE_DIR, "unrecognized_questions.log")

def log_unrecognized_question(msg: str, confidence: float, metadata: Dict) -> None:
    entry = {
        "timestamp": int(time.time()),
        "message": msg,
        "confidence": round(confidence, 4),
        "meta": metadata,
    }
    with open(UNREC_LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


# -----------------------------
# Protocolo de resposta (schema estável)
# -----------------------------

def make_response(
    *,
    ok: bool,
    response_html: str = "",
    response_text: str = "",
    categoria: str = "geral",
    confidence: float = 0.0,
    matched_question: Optional[str] = None,
    answer_id: Optional[str] = None,
    suggestions: Optional[List[str]] = None,
    greeted: bool = False,
    extra: Optional[Dict] = None,
):
    payload = {
        "ok": ok,
        "version": API_VERSION,
        "response": response_html or response_text,
        "response_html": response_html,
        "response_text": response_text,
        "categoria": categoria,
        "confidence": round(float(confidence), 4),
        "matched_question": matched_question,
        "answer_id": answer_id,
        "suggestions": suggestions or [],
        "greeting": greeted,
        "meta": {"engine": "rule+fuzzy", **(extra or {})},
    }
    return jsonify(payload)


# -----------------------------
# Endpoints
# -----------------------------
@app.route("/api/health", methods=["GET"])  # simples *liveness* check
def health():
    return jsonify({"ok": True, "version": API_VERSION})


@app.route("/api/message", methods=["POST"])
def message():
    body = request.get_json(force=True, silent=True) or {}
    user_msg: str = body.get("message", "")
    session_id: Optional[str] = body.get("session_id")  # forneça do front p/ saudação por sessão

    if not user_msg.strip():
        return make_response(
            ok=False,
            response_text="Por favor, envie uma mensagem.",
            suggestions=["O que é a Tecnoagil?", "Quais serviços vocês oferecem?"],
        )

    # Saudação por sessão (somente uma vez por session_id em ~12h)
    greeted = False
    if should_greet(session_id):
        greeted = True

    # 1) Matching determinístico (exato/fuzzy) no seu corpus
    qa, score, matched_q = find_best_match(user_msg)

    if qa and score >= DEFAULT_CONFIDENCE_THRESHOLD:
        # resposta "oficial" do JSON
        return make_response(
            ok=True,
            response_html=str(qa.answer),
            response_text=re.sub(r"<[^>]+>", " ", str(qa.answer)).strip(),
            categoria=qa.category,
            confidence=score,
            matched_question=matched_q,
            answer_id=qa.id,
            suggestions=get_suggestions(user_msg),
            greeted=greeted,
            extra={"matched_via": "exact" if score >= 0.9999 else "fuzzy"},
        )

    # 2) Se não atingiu o limiar, tenta fallback conversacional (ChatterBot)
    if chatbot is not None and qa is None:
        try:
            cb_resp = chatbot.get_response(user_msg)
            cb_conf = float(getattr(cb_resp, "confidence", 0.0) or 0.0)
            if cb_conf >= 0.65:  # só aceita se confiança for razoável
                return make_response(
                    ok=True,
                    response_html=str(cb_resp),
                    response_text=str(cb_resp),
                    categoria="conversa",
                    confidence=min(cb_conf, 0.95),
                    matched_question=None,
                    answer_id=None,
                    suggestions=get_suggestions(user_msg),
                    greeted=greeted,
                    extra={"matched_via": "chatterbot"},
                )
        except Exception:
            pass

    # 3) Fallback final: pedido de reformulação + sugestões guiadas
    sugg = get_suggestions(user_msg)
    log_unrecognized_question(
        user_msg,
        float(score or 0.0),
        {
            "session_id": session_id,
            "top_suggestions": sugg,
            "matched_question": matched_q,
        },
    )

    fallback = (
        "Desculpe, não consegui identificar sua pergunta com precisão. "
        "Você pode reformular? Posso ajudar com:"
    )
    html = fallback + ("<ul>" + "".join(f"<li>{q}</li>" for q in sugg) + "</ul>" if sugg else "")

    return make_response(
        ok=False,
        response_html=html,
        response_text=re.sub(r"<[^>]+>", " ", html).strip(),
        categoria="geral",
        confidence=float(score or 0.0),
        matched_question=matched_q,
        answer_id=None,
        suggestions=sugg,
        greeted=greeted,
        extra={"matched_via": "none"},
    )


# -----------------------------
# Execução local para desenvolvimento
# -----------------------------
if __name__ == "__main__":
    # Dica: defina FLASK_DEBUG=1 no ambiente se quiser auto-reload.
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
