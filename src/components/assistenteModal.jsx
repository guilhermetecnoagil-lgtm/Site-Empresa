import React, { useEffect, useRef, useState } from "react";
import "../styles/assistenteModal.css";
import botIcon from "../img/tedi.png";
import botIcon2 from "../img/tedi2.png";

const API_URL = "http://localhost:5000";

export default function AssistenteModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const modalRef = useRef(null);

  // session_id por aba
  const [sessionId] = useState(() => {
    const key = "tecnoagil_session_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    localStorage.setItem(key, id);
    return id;
  });

  // scroll automático para última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // simulação de position: fixed via absolute + scroll/resize listener
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const updatePosition = () => {
      const bottomOffset = 20;
      const rightOffset = 20;
      const modalHeight = modal.offsetHeight;
      const modalWidth = modal.offsetWidth;

      modal.style.top =
        window.scrollY + window.innerHeight - modalHeight - bottomOffset + "px";
      modal.style.left =
        window.scrollX + window.innerWidth - modalWidth - rightOffset + "px";
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const respHtml = data.response_html || data.response || "";
      const respText = data.response_text || data.response || "";
      const payload =
        respHtml ||
        respText ||
        "Desculpe, algo deu errado ao processar a resposta.";

      // Adiciona resposta do bot
      setMessages((prev) => [...prev, { from: "bot", text: payload }]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      const msgErro = `
        <b>Ops!</b> Não consegui falar com o servidor agora.<br/>
        Verifique se a API está rodando em <code>${API_URL}</code> e o CORS está habilitado.
      `;
      setMessages((prev) => [...prev, { from: "bot", text: msgErro }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="assistente-wrapper">
      <div className="assistente-modal" ref={modalRef}>
        {/* Header */}
        <div className="assistente-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={botIcon2} alt="Ted" className="bot-avatar-title" />
            <span className="title-tedi">Ted - Assistente Virtual</span>
          </div>
          <button className="assistente-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corpo do chat */}
        <div className="assistente-body chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.from}`}>
              {msg.from === "bot" && (
                <img src={botIcon} alt="Bot" className="bot-avatar" />
              )}
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
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
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
