import React, { useState, useEffect, useRef } from "react";
import "../styles/EmpresaSection.css";
import imagem1 from "../img/Tecnoagil1.webp";
import imagem2 from "../img/Tecnoagil2.webp";
import imagem3 from "../img/monitoramento.webp";
import useFadeDirection from "../hooks/useFadeOnScroll"; // hook de animação

// 🔹 Componente de imagem com lazy loading real
function LazyImage({ src, alt, className = "", ...props }) {
  const [visible, setVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={visible ? src : ""}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}

const EmpresaSection = () => {
  const [destaque, setDestaque] = useState(null);
  const cardsRef = useRef([]);

  // Hooks de fade
  const [refH1, stateH1] = useFadeDirection();
  const [refP, stateP] = useFadeDirection();
  const [refBtn, stateBtn] = useFadeDirection();

  // Fecha destaque se clicar fora
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
          <h1 ref={refH1} className={`fade-text fade-${stateH1}`}>
            GRUPO TECNOAGIL
          </h1>
          <p ref={refP} className={`fade-text fade-${stateP}`}>
            TRANSFORMANDO VIDAS HÁ MAIS DE 18 ANOS COM SEGURANÇA, TECNOLOGIA E
            AGILIDADE
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
              <LazyImage src={img} alt={`Câmera ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default EmpresaSection;
