// ServicosSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ServicosSection.css";
import { servicos } from "../data/servicos"; // <— usa o mesmo array

const INTERVALO = 8000;

const ServicosSection = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  // === mantém sua lógica original de animação ===
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

  // preload do próximo slide (não altera UI/estilo)
  useEffect(() => {
    const next = (index + 1) % servicos.length;
    const img = new Image();
    img.src = servicos[next].imagem;
  }, [index]);

  const handleClick = (i) => {
    if (i === index) return;
    setFade(false);
    setTimeout(() => {
      setIndex(i);
      setFade(true);
      setStartTime(Date.now());
      setProgress(0);
    }, 300);
  };

  return (
    <section className="servicos-section">
      <div className="servicos-container">
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

        <div className="servicos-imagem">
          <img
            src={servicos[index].imagem}
            alt={servicos[index].titulo}
            className={`imagem-servico ${fade ? "fade-in" : "fade-out"}`}
            loading="lazy"
            decoding="async"
          />
          {/* botão DESKTOP dentro da coluna da imagem */}
          <Link
            to={`/servicos/${servicos[index].slug}`}
            className="btn-saiba-mais btn-desktop"
          >
            Saiba Mais
          </Link>
        </div>

        {/* botão MOBILE agora dentro do container */}
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
