import React, { memo, useMemo } from "react";
import "../styles/curriculum.css"; // 🔹 mover estilos para um arquivo CSS

const Curriculum = () => {
  const phoneNumber = "557734210975"; // Substitua pelo número real
  const message = "Olá, gostaria de enviar meu currículo.";

  // 🔹 Memoiza o link para não recriar a cada render
  const whatsappLink = useMemo(
    () => `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    [phoneNumber, message]
  );

  return (
    <div className="curriculum-container">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="curriculum-button"
        title="Clique para nos enviar uma mensagem no WhatsApp"
      >
        📄 💬 Trabalhe Conosco – Envie seu Currículo pelo WhatsApp
      </a>

      <p className="curriculum-subtext">
        Clique no botão acima para falar conosco diretamente pelo WhatsApp e enviar seu currículo.
      </p>
    </div>
  );
};

export default memo(Curriculum);
