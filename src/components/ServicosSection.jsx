// src/components/ServicosSection.jsx
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import "../styles/ServicosSection.css";
import { servicos } from "../data/servicos";

const INTERVALO = 8000;

// 🔹 LazyImage otimizado com IntersectionObserver
const LazyImage = memo(function LazyImage({ src, alt, className = "", priority = false }) {
  const [visible, setVisible] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return; // já carrega se for prioritária

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
  }, [priority]);

  return (
    <img
      ref={imgRef}
      src={visible ? src : undefined}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
});

// 🔹 Componente principal
const ServicosSection = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  // progresso + auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress((elapsed / INTERVALO) * 100);
    }, 100);

    const autoSlide = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % servicos.length);
        setFade(true);
        setStartTime(Date.now());
      }, 300);
    }, INTERVALO);

    return () => {
      clearInterval(timer);
      clearTimeout(autoSlide);
    };
  }, [startTime]);

  // 🔹 Preload do próximo slide
  useEffect(() => {
    const next = (index + 1) % servicos.length;
    const img = new Image();
    img.src = servicos[next].imagem;
  }, [index]);

  // 🔹 Handler estável
  const handleClick = useCallback(
    (i) => {
      if (i === index) return;
      setFade(false);
      setTimeout(() => {
        setIndex(i);
        setFade(true);
        setStartTime(Date.now());
        setProgress(0);
      }, 300);
    },
    [index]
  );

  return (
    <section className="servicos-section">
      <div className="servicos-container">
        {/* textos e abas */}
        <div className="servicos-texto">
          <span className="servicos-indice">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>

          <div className="barra-servicos">
            {servicos.map((servico, i) => (
              <div
                key={servico.slug}
                className={`barra-item ${i === index ? "ativo" : ""}`}
                onClick={() => handleClick(i)}
              >
                {servico.titulo}
                {i === index && (
                  <div
                    className="barra-progresso"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            ))}
          </div>

          <h2 className="servicos-titulo">{servicos[index].titulo}</h2>
          <p className="servicos-descricao">{servicos[index].descricao}</p>
        </div>

        {/* imagem principal */}
        <div className="servicos-imagem">
          <LazyImage
            src={servicos[index].imagem}
            alt={servicos[index].titulo}
            className={`imagem-servico ${fade ? "fade-in" : "fade-out"}`}
            priority={index === 0} // 🔹 primeira carrega já no início
          />
          <Link
            to={`/servicos/${servicos[index].slug}`}
            className="btn-saiba-mais btn-desktop"
          >
            Saiba Mais
          </Link>
        </div>

        {/* botão mobile */}
        <Link
          to={`/servicos/${servicos[index].slug}`}
          className="btn-saiba-mais btn-mobile"
        >
          Saiba Mais
        </Link>
      </div>
    </section>
  );
};

export default memo(ServicosSection);
