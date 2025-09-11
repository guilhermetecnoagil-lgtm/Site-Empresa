import React from "react";
import "../styles/QualidadeSection.css";
import imagemPainel from "../img/Logo.png";

// Ícones
import { FaUserTie, FaCarSide, FaMedal } from "react-icons/fa";

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
          <div className="dado">
            <FaUserTie className="dado-icon" />
            <h3>200</h3>
            <p>Colaboradores</p>
          </div>
          <div className="dado">
            <FaCarSide className="dado-icon" />
            <h3>100</h3>
            <p>Veículos</p>
          </div>
          <div className="dado">
            <FaMedal className="dado-icon" />
            <h3>30</h3>
            <p>Conquistas</p>
          </div>
        </div>
      </div>

      <div className="qualidade-imagem">
        <div className="qualidade-card">
          <img src={imagemPainel} alt="Painel de segurança" />
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

export default QualidadeSection;
