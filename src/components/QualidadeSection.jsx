import React, { memo } from "react";
import "../styles/QualidadeSection.css";
import imagemPainel from "../img/Logo.webp";

// Ícones
import { FaUserTie, FaCarSide, FaMedal } from "react-icons/fa";

// 🔹 Componente otimizado para cada “dado”
const Dado = memo(({ Icon, valor, label }) => (
  <div className="dado">
    <Icon className="dado-icon" aria-hidden="true" />
    <h3>{valor}</h3>
    <p>{label}</p>
  </div>
));

const dados = [
  { Icon: FaUserTie, valor: "200", label: "Colaboradores" },
  { Icon: FaCarSide, valor: "100", label: "Veículos" },
  { Icon: FaMedal, valor: "30", label: "Conquistas" },
];

const QualidadeSection = () => {
  return (
    <section className="qualidade-section">
      <div className="qualidade-textos">
        <h2>
          Inovação, Segurança e <span>Qualidade</span>
        </h2>
        <p>
          Com mais de 18 anos no mercado de segurança e tecnologia, a empresa já
          obteve inúmeras conquistas e reconhecimentos. Dessa forma, a empresa
          destaca-se quando o assunto é inovação, segurança e qualidade.
        </p>

        <div className="qualidade-dados">
          {dados.map((dado, i) => (
            <Dado key={i} {...dado} />
          ))}
        </div>
      </div>

      <div className="qualidade-imagem">
        <div className="qualidade-card">
          <img
            src={imagemPainel}
            alt="Painel de segurança"
            loading="lazy"
            decoding="async"
          />
          <div className="texto-card">
            <h3>GRUPO TECNOAGIL</h3>
            <p>
              Levando tecnologia, segurança e qualidade de vida para você e sua
              família.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(QualidadeSection);
