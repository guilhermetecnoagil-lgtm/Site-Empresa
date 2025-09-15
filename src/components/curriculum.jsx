import React from "react";

export default function Curriculum() {
  // Substitua pelo número real da empresa (com DDI, sem espaços ou traços)
  const phoneNumber = "557734210975"; // Ex: 55 = Brasil, 11 = DDD, 999999999 = número
  const message = "Olá, gostaria de enviar meu currículo.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        title="Clique para nos enviar uma mensagem no WhatsApp"
        style={{
          padding: "14px 28px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textDecoration: "none",
          animation: "pulse 5s infinite",
        }}
      >
        📄 💬 Trabalhe Conosco – Envie seu Currículo pelo WhatsApp
      </a>

      <p
        style={{
          marginTop: "12px",
          fontSize: "15px",
          color: "var(--text-secondary)",
          fontStyle: "italic",
        }}
      >
        Clique no botão acima para falar conosco diretamente pelo WhatsApp e enviar seu currículo.
      </p>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
