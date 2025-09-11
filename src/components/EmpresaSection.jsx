import React, { useState, useEffect, useRef } from "react";
import "../styles/EmpresaSection.css";
import imagem1 from "../img/Tecnoagil1.jpg";
import imagem2 from "../img/Tecnoagil2.jpg";
import imagem3 from "../img/monitoramento.jpg";
import useFadeDirection from "../hooks/useFadeOnScroll"; // novo hook

const EmpresaSection = () => {
  const [destaque, setDestaque] = useState(null);
  const cardsRef = useRef([]);

  // Hooks com classe 'in' ou 'out'
  const [refH1, stateH1] = useFadeDirection();
  const [refP, stateP] = useFadeDirection();
  const [refBtn, stateBtn] = useFadeDirection();

  useEffect(() => {
    const handleClickFora = (event) => {
      if (
        cardsRef.current.every((card) => card && !card.contains(event.target))
      ) {
        setDestaque(null);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <section className="empresa-section">
      <div className="empresa-overlay"></div>

      <div className="empresa-content">
        <div className="empresa-text">
          <h1
            ref={refH1}
            className={`fade-text fade-${stateH1}`}
          >
            GRUPO TECNOAGIL
          </h1>
          <p
            ref={refP}
            className={`fade-text fade-${stateP}`}
          >
            TRANSFORMANDO VIDAS HÁ MAIS DE 18 ANOS COM SEGURANÇA, TECNOLOGIA E AGILIDADE
          </p>
          <a href="#contato">
            <button
              ref={refBtn}
              className={`empresa-btn fade-text fade-${stateBtn}`}
            >
              Entrar em Contato
            </button>
          </a>
        </div>

        <div className="empresa-floating">
          {[imagem3, imagem2, imagem1].map((img, i) => (
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
              <img src={img} alt={`Câmera ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default EmpresaSection;
