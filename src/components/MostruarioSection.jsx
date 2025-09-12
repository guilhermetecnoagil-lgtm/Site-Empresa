// Hooks do React e estilos/imagens usados na seção
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "../styles/MostruarioSection.css";
import casaImg from "../img/casa.webp";
import monitoramento from "../img/monitoramento.webp";
import automacao from "../img/Automacao.webp";
import controle from "../img/ControleDeAcesso.webp";
import solar from "../img/PainelSolar.webp";
import rastreamento from "../img/RastreamentoVeicular.webp";
import { servicos } from "../data/servicos";
import { Link } from "react-router-dom";

// 🔹 LazyImage (igual usamos na outra seção)
function LazyImage({ src, alt, className = "", ...props }) {
  const [visible, setVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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

const MostruarioSection = () => {
  const sectionRef = useRef(null);
  const [popupData, setPopupData] = useState(null);
  const [animating, setAnimating] = useState(false);

  // helper robusto: obtém slug a partir do título
  const getSlugFromTitle = useCallback((tituloPonto) => {
    const match = servicos.find(
      (s) => s.titulo?.toLowerCase() === tituloPonto?.toLowerCase()
    );
    return match?.slug ?? "";
  }, []);

  // Array de pontos memoizado (melhor que recriar toda vez)
  const pontos = useMemo(
    () => [
      {
        top: "70%",
        left: "25%",
        img: controle,
        title: "CONTROLE DE ACESSO",
        desc: "MANTENHA A SUA RESIDÊNCIA OU COMÉRCIO SEGUROS COM A ENTRADA SOMENTE DE PESSOAS AUTORIZADAS.",
        slug: getSlugFromTitle("CONTROLE DE ACESSO"),
      },
      {
        top: "45%",
        left: "45%",
        img: solar,
        title: "ENERGIA SOLAR",
        desc: "UMA FONTE DE ENERGIA ALTERNATIVA RENOVÁVEL, ALÉM DE FORNECER REDUÇÃO NA SUA CONTA DE ENERGIA.",
        slug: getSlugFromTitle("ENERGIA SOLAR"),
      },
      {
        top: "60%",
        left: "38%",
        img: automacao,
        title: "AUTOMAÇÃO RESIDENCIAL",
        desc: "MODERNIZE SUA RESIDÊNCIA, COM CONTROLE INTELIGENTE DE ILUMINAÇÃO, TVS, SOM E MAIS.",
        slug: getSlugFromTitle("AUTOMAÇÃO RESIDENCIAL"),
      },
      {
        top: "64%",
        left: "64%",
        img: monitoramento,
        title: "MONITORAMENTO 24H",
        desc: "INIBA FURTOS E ROUBOS COM MONITORAMENTO CONTÍNUO E SUPORTE ESPECIALIZADO.",
        slug: getSlugFromTitle("MONITORAMENTO 24H"),
      },
      {
        top: "75%",
        left: "55%",
        img: rastreamento,
        title: "RASTREAMENTO VEICULAR",
        desc: "ACOMPANHE A LOCALIZAÇÃO DO SEU VEÍCULO EM TEMPO REAL.",
        slug: getSlugFromTitle("RASTREAMENTO VEICULAR"),
      },
    ],
    [getSlugFromTitle]
  );

  // Melhor performance: debounce do mousemove
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        section.style.setProperty("--mouse-x", `${x}%`);
        section.style.setProperty("--mouse-y", `${y}%`);
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="mostruario-section" ref={sectionRef}>
      <div className="mostruario-card">
        <div className={`planta-container ${popupData ? "shift-left" : ""}`}>
          <h2>Mostruário Interativo</h2>
          <p className="mostruario-hint">
            Clique nos pontos vermelhos para saber mais sobre cada item.
          </p>

          <LazyImage src={casaImg} alt="Casa 3D" className="planta-img" />

          {pontos.map((ponto, index) => (
            <button
              key={index}
              className="ponto-hover"
              style={{ top: ponto.top, left: ponto.left }}
              onClick={() => {
                if (popupData && popupData.title === ponto.title) return;

                setAnimating(true);
                setTimeout(() => {
                  setPopupData(ponto);
                  setAnimating(false);
                }, 300);
              }}
              title={`Clique para ver: ${ponto.title}`}
              aria-label={`Abrir detalhes de ${ponto.title}`}
            >
              <div className="ponto">
                <span className="ponto-tooltip">{ponto.title}</span>
              </div>
            </button>
          ))}
        </div>

        {popupData && (
          <div
            className={`popup-fixo ${
              animating ? "popup-saindo" : "popup-entrando"
            }`}
          >
            <LazyImage
              src={popupData.img}
              className="popup-img-grande"
              alt={popupData.title}
            />
            <div className="popup-texto-grande">
              <strong>{popupData.title}</strong>
              <p>{popupData.desc}</p>

              <Link to={`/servicos/${popupData.slug}`} className="more-page">
                Saiba Mais
              </Link>

              <br />
              <button
                className="fechar-popup"
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setPopupData(null);
                    setAnimating(false);
                  }, 300);
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MostruarioSection;
