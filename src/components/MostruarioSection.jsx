// Hooks do React e estilos/imagens usados na seção
import React, { useEffect, useRef, useState } from "react";
import "../styles/MostruarioSection.css";
import casaImg from "../img/casa.png";
import monitoramento from "../img/monitoramento.jpg";
import automacao from "../img/Automacao.jpg";
import controle from "../img/ControleDeAcesso.jpg";
import solar from "../img/PainelSolar.jpg";
import rastreamento from "../img/RastreamentoVeicular.jpeg";
import { servicos } from "../data/servicos"; // <— usa o mesmo array
import { Link } from "react-router-dom";

const MostruarioSection = () => {
  const sectionRef = useRef(null);

  const [popupData, setPopupData] = useState(null);
  const [animating, setAnimating] = useState(false);

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

  // Pontos clicáveis sobre a planta (pins)
  const pontos = [
    {
      top: "70%",
      left: "25%",
      img: controle,
      title: "CONTROLE DE ACESSO",
      desc: "MANTENHA A SUA RESIDÊNCIA OU COMÉRCIO SEGUROS COM A ENTRADA SOMENTE DE PESSOAS AUTORIZADAS.",
    },
    {
      top: "45%",
      left: "45%",
      img: solar,
      title: "ENERGIA SOLAR",
      desc: "UMA FONTE DE ENERGIA ALTERNATIVA RENOVÁVEL, ALÉM DE FORNECER REDUÇÃO NA SUA CONTA DE ENERGIA.",
    },
    {
      top: "60%",
      left: "38%",
      img: automacao,
      title: "AUTOMAÇÃO RESIDENCIAL",
      desc: "MODERNIZE SUA RESIDÊNCIA, COM CONTROLE INTELIGENTE DE ILUMINAÇÃO, TVS, SOM E MAIS.",
    },
    {
      top: "64%",
      left: "64%",
      img: monitoramento,
      title: "MONITORAMENTO 24H",
      desc: "INIBA FURTOS E ROUBOS COM MONITORAMENTO CONTÍNUO E SUPORTE ESPECIALIZADO.",
    },
    {
      top: "75%",
      left: "55%",
      img: rastreamento,
      title: "RASTREAMENTO VEICULAR",
      desc: "ACOMPANHE A LOCALIZAÇÃO DO SEU VEÍCULO EM TEMPO REAL.",
    },
  ];

  // helper robusto: tenta casar o título do ponto com o `servicos[i].titulo`
  const getSlugFromTitle = (tituloPonto) => {
  const match = servicos.find(
    (s) => s.titulo?.toLowerCase() === tituloPonto?.toLowerCase()
  );
  return match?.slug ?? "";
};


  return (
    <section className="mostruario-section" ref={sectionRef}>
      <div className="mostruario-card">
        <div className={`planta-container ${popupData ? "shift-left" : ""}`}>
          <h2>Mostruario Interativo</h2>
          <p className="mostruario-hint">
            Clique nos pontos vermelhos para saber mais sobre cada item.
          </p>

          <img src={casaImg} alt="Casa 3D" className="planta-img" />

          {pontos.map((ponto, index) => (
            <div
              key={index}
              className="ponto-hover"
              style={{ top: ponto.top, left: ponto.left }}
              onClick={() => {
                if (popupData && popupData.title === ponto.title) return;

                setAnimating(true);

                setTimeout(() => {
                  // Opção A (pelo índice, se a ordem de `pontos` == `servicos`):
                  // const slug = servicos?.[index]?.slug ?? "";

                  // Opção B (mais segura: casar por título com `servicos[i].titulo`)
                  const slug = getSlugFromTitle(ponto.title);

                  setPopupData({ ...ponto, slug });
                  setAnimating(false);
                }, 300);
              }}
              title={`Clique para ver: ${ponto.title}`}
            >
              <div className="ponto">
                <span className="ponto-tooltip">{ponto.title}</span>
              </div>
            </div>
          ))}
        </div>

        {popupData && (
          <div
            className={`popup-fixo ${animating ? "popup-saindo" : "popup-entrando"}`}
          >
            <img
              src={popupData.img}
              className="popup-img-grande"
              alt={popupData.title}
            />
            <div className="popup-texto-grande">
              <strong>{popupData.title}</strong>
              <p>{popupData.desc}</p>

              {/* Use o slug salvo no popupData */}
              <Link
                to={ `/servicos/${popupData.slug}`}
                className="more-page"
              >
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
