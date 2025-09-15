import React, { useState, useEffect, useRef } from "react";
import "../styles/EmpresaSection.css";

// Imagens locais
import imagem1 from "../img/Tecnoagil1.webp";
import imagem2 from "../img/Tecnoagil2.webp";
import imagem3 from "../img/monitoramento.webp"; // Hero (não lazy)

// Hook de animação
import useFadeDirection from "../hooks/useFadeOnScroll";

// ===============================
// 🔹 Componente LazyImage otimizado
// ===============================
function LazyImage({ src, alt, className = "", ...props }) {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
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

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`lazy-wrapper ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#111", // placeholder escuro
      }}
    >
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`lazy-img ${loaded ? "loaded" : "loading"}`}
          {...props}
        />
      )}
    </div>
  );
}

// ===============================
// 🔹 EmpresaSection
// ===============================
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

  // ===============================
  // 🔹 Pré-carregamento em background
  // ===============================
  useEffect(() => {
    const preload = [
      "/img/servico1.webp",
      "/img/servico2.webp",
      "/img/servico3.webp",
      "/img/mostruario1.webp",
      "/img/mostruario2.webp",
    ];
    preload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section className="empresa-section">
      <div className="empresa-overlay"></div>

      <div className="empresa-content">
        {/* Texto principal */}
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

        {/* Imagens flutuantes */}
        <div className="empresa-floating">
          {/* Hero SEM lazy (primeira imagem principal) */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className={`empresa-card ${destaque === 0 ? "ativo" : ""}`}
            style={{
              top: "0%",
              left: "20%",
              zIndex: destaque === 0 ? 3 : 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setDestaque(0);
            }}
          >
            <img
              src={imagem3}
              alt="Monitoramento"
              className="hero-img"
              loading="eager"
            />
          </div>

          {/* Outras imagens com Lazy */}
          {[imagem2, imagem1].map((img, i) => (
            <div
              key={i + 1}
              ref={(el) => (cardsRef.current[i + 1] = el)}
              className={`empresa-card ${destaque === i + 1 ? "ativo" : ""}`}
              style={{
                top: `${(i + 1) * 20}%`,
                left: `${35 + i * 15}%`,
                zIndex: destaque === i + 1 ? 3 : 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDestaque(i + 1);
              }}
            >
              <LazyImage src={img} alt={`Câmera ${i + 2}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default EmpresaSection;
