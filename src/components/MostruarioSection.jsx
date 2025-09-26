// src/components/MostruarioSection.jsx
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import "../styles/MostruarioSection.css";
import casaImg from "../img/casa.webp";
import { servicos } from "../data/servicos";
import { Link } from "react-router-dom";

// 🔹 pontos definidos fora do componente (fixos)
const pontos = [
  { top: "70%", left: "25%", slug: "controle-de-acesso", title: "CONTROLE DE ACESSO", desc: "MANTENHA A SUA RESIDÊNCIA OU COMÉRCIO SEGUROS COM A ENTRADA SOMENTE DE PESSOAS AUTORIZADAS." },
  { top: "45%", left: "45%", slug: "energia-solar", title: "ENERGIA SOLAR", desc: "UMA FONTE DE ENERGIA ALTERNATIVA RENOVÁVEL, ALÉM DE FORNECER REDUÇÃO NA SUA CONTA DE ENERGIA." },
  { top: "60%", left: "38%", slug: "automacao", title: "AUTOMAÇÃO RESIDENCIAL", desc: "MODERNIZE SUA RESIDÊNCIA, COM CONTROLE INTELIGENTE DE ILUMINAÇÃO, TVS, SOM E MAIS." },
  { top: "64%", left: "64%", slug: "monitoramento-24horas", title: "MONITORAMENTO 24H", desc: "INIBA FURTOS E ROUBOS COM MONITORAMENTO CONTÍNUO E SUPORTE ESPECIALIZADO." },
  { top: "75%", left: "55%", slug: "rastreamento-veicular", title: "RASTREAMENTO VEICULAR", desc: "ACOMPANHE A LOCALIZAÇÃO DO SEU VEÍCULO EM TEMPO REAL." },
];

// 🔹 Ponto interativo isolado + memo
const PontoInterativo = memo(({ ponto, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="ponto-hover"
      style={{ top: ponto.top, left: ponto.left }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Saiba mais sobre ${ponto.title}`}
      title={`Clique para ver: ${ponto.title}`}
    >
      <div className="ponto">
        <span className="ponto-tooltip">{ponto.title}</span>
      </div>
    </div>
  );
});

// 🔹 Popup isolado
const Popup = ({ data, onClose }) => {
  if (!data) return null;

  const match = servicos.find((s) => s.slug === data.slug);

  return (
    <div className="popup-fixo popup-entrando">
      <img
        src={match?.imagem ?? ""}
        className="popup-img-grande"
        alt={data.title}
        loading="lazy"
        decoding="async"
      />
      <div className="popup-texto-grande">
        <strong>{data.title}</strong>
        <p>{data.desc}</p>

        <Link to={`/servicos/${data.slug}`} className="more-page">
          Saiba Mais
        </Link>

        <br />
        <button className="fechar-popup" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

const MostruarioSection = () => {
  const sectionRef = useRef(null);
  const [popupData, setPopupData] = useState(null);

  // 🔹 Efeito de movimento do mouse
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty("--mouse-x", `${x}%`);
      section.style.setProperty("--mouse-y", `${y}%`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="mostruario-section" ref={sectionRef}>
      <div className="mostruario-card">
        <div className={`planta-container ${popupData ? "shift-left" : ""}`}>
          <h2>Mostruário Interativo</h2>
          <p className="mostruario-hint">
            Clique nos pontos vermelhos para saber mais sobre cada item.
          </p>

          {/* Planta principal */}
          <img
            src={casaImg}
            alt="Casa 3D"
            className="planta-img"
            loading="eager"
            decoding="async"
          />

          {/* Pontos interativos */}
          {pontos.map((p, i) => (
            <PontoInterativo key={i} ponto={p} onClick={() => setPopupData(p)} />
          ))}
        </div>

        {/* Popup */}
        <Popup data={popupData} onClose={() => setPopupData(null)} />
      </div>
    </section>
  );
};

export default MostruarioSection;
