import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "../styles/EmpresaSectionMobile.css";

// Imagens locais
import imagem1 from "../img/Tecnoagil1.webp";
import imagem2 from "../img/Tecnoagil2.webp";
import imagem3 from "../img/Tecnoagil2.webp"; // pode ser substituída se for diferente

const EmpresaSectionMobile = () => {
  const [destaque, setDestaque] = useState(null);
  const cardsRef = useRef([]);

  // 🔹 Fecha destaque se clicar fora
  const handleClickFora = useCallback((event) => {
    if (cardsRef.current.every((card) => card && !card.contains(event.target))) {
      setDestaque(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [handleClickFora]);

  const imagens = [imagem1, imagem2, imagem3];

  return (
    <section className="empresa-section">
      <div className="empresa-overlay"></div>

      <div className="empresa-content">
        {/* Texto principal */}
        <div className="empresa-text">
          <h1>GRUPO TECNOAGIL</h1>
          <p>
            TRANSFORMANDO VIDAS HÁ MAIS DE 18 ANOS COM SEGURANÇA, TECNOLOGIA E
            AGILIDADE
          </p>
          <a href="#contato">
            <button className="empresa-btn">Entrar em Contato</button>
          </a>
        </div>

        {/* Cards flutuantes */}
        <div className="empresa-floating">
          {imagens.map((img, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`empresa-card ${destaque === i ? "ativo" : ""}`}
              style={{
                top: `${i * 20}%`,
                left: `${20 + i * 15}%`,
                zIndex: destaque === i ? 3 : 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDestaque(i);
              }}
            >
              <img src={img} alt={`Câmera ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default memo(EmpresaSectionMobile);
