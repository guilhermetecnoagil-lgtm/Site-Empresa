import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import "../styles/assistenteModal.css";
import botIcon from "../img/tedi.webp";
import botIcon2 from "../img/tedi2.webp";

const API_URL = "https://api-teste-z0k3.onrender.com";

// 🔹 Componente de Mensagem separado + memo para evitar re-renderizações desnecessárias
const Message = memo(({ from, text }) => (
  <div className={`message ${from}`}>
    {from === "bot" && (
      <img src={botIcon} alt="Bot" className="bot-avatar" loading="lazy" />
    )}
    <span dangerouslySetInnerHTML={{ __html: text }} />
  </div>
));

export default function AssistenteModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const modalRef = useRef(null);

  // 🔹 session_id armazenado uma vez só
  const [sessionId] = useState(() => {
    const key = "tecnoagil_session_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    localStorage.setItem(key, id);
    return id;
  });

  // 🔹 Scroll automático para última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Atualização de posição fixa simulada
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const updatePosition = () => {
      const bottomOffset = 20;
      const rightOffset = 20;
      modal.style.top = `${
        window.scrollY + window.innerHeight - modal.offsetHeight - bottomOffset
      }px`;
      modal.style.left = `${
        window.scrollX + window.innerWidth - modal.offsetWidth - rightOffset
      }px`;
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // 🔹 Função memoizada para evitar recriação a cada render
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

      const data = await res.json();
      const payload =
        data.response_html || data.response_text || data.response || 
        "Desculpe, algo deu errado ao processar a resposta.";

      setMessages((prev) => [...prev, { from: "bot", text: payload }]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `
            <b>Ops!</b> Não consegui falar com o servidor agora.<br/>
            Verifique se a API está rodando em <code>${API_URL}</code> e o CORS está habilitado.
          `,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId]);

  const handleSendClick = useCallback(() => {
    if (!loading && input.trim()) sendMessage();
  }, [loading, input, sendMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendClick();
      }
    },
    [handleSendClick]
  );

  if (!isOpen) return null;

  return (
    <div className="assistente-wrapper" role="dialog" aria-modal="true">
      <div className="assistente-modal" ref={modalRef}>
        {/* Header */}
        <div className="assistente-header">
          <div className="assistente-title">
            <img
              src={botIcon2}
              alt="Ted"
              className="bot-avatar-title"
              loading="lazy"
            />
            <span className="title-tedi">Ted - Assistente Virtual</span>
          </div>
          <button className="assistente-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corpo do chat */}
        <div className="assistente-body chat-box">
          {messages.map((msg, i) => (
            <Message key={i} from={msg.from} text={msg.text} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Rodapé */}
        <div className="assistente-footer input-area">
          <textarea
            rows={1}
            placeholder={loading ? "Enviando..." : "Digite sua mensagem..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleSendClick}
            disabled={loading || !input.trim()}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
