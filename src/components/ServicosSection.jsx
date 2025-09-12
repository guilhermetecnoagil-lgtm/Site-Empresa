// ServicosSection.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/ServicosSection.css";
import { servicos } from "../data/servicos";

const INTERVALO = 8000;

// 🔹 LazyImage simples
function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "loaded" : "loading"}`}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
}

const ServicosSection = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  // 🔹 Atualiza progresso com requestAnimationFrame
  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / INTERVALO) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    const autoSlide = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % servicos.length);
        setFade(true);
        setStartTime(Date.now());
      }, 300);
    }, INTERVALO);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(autoSlide);
    };
  }, [startTime]);

  // 🔹 Handler memoizado
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
        {/* Texto e barra de serviços */}
        <div className="servicos-texto">
          <span className="servicos-indice">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>

          <div className="barra-servicos">
            {servicos.map((servico, i) => (
              <button
                key={servico.slug}
                className={`barra-item ${i === index ? "ativo" : ""}`}
                onClick={() => handleClick(i)}
                aria-label={`Ver serviço: ${servico.titulo}`}
              >
                {servico.titulo}
                {i === index && (
                  <div
                    className="barra-progresso"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <h2 className="servicos-titulo">{servicos[index].titulo}</h2>
          <p className="servicos-descricao">{servicos[index].descricao}</p>
        </div>

        {/* Imagem e botão Desktop */}
        <div className="servicos-imagem">
          <LazyImage
            src={servicos[index].imagem}
            alt={servicos[index].titulo}
            className={`imagem-servico ${fade ? "fade-in" : "fade-out"}`}
          />
          <Link
            to={`/servicos/${servicos[index].slug}`}
            className="btn-saiba-mais btn-desktop"
          >
            Saiba Mais
          </Link>
        </div>

        {/* Botão Mobile */}
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

export default ServicosSection;
