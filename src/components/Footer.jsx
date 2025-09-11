// Importa React para uso de JSX
import React from "react";

// Importa os estilos específicos do rodapé
import "../styles/Footer.css";

// Importa ícones de redes sociais da biblioteca react-icons
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    // Elemento semântico <footer> que representa o rodapé do site
    <footer className="footer">
      {/* Container do conteúdo do rodapé (controle de layout via CSS) */}
      <div className="footer-content">
        {/* Marca / logotipo com destaque em "TECNOAGIL" */}
        <h2>
          GRUPO <span className="red">TECNOAGIL</span>
        </h2>

        {/* Bloco com ícones e links para redes sociais */}
        <div className="footer-icons">
          {/* Cada link abre em nova aba e usa rel para segurança */}
          <a href="https://pt-br.facebook.com/grupotecnoagil" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/tecnoagil" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=557734210975&text=Olá!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a href="https://www.linkedin.com/company/grupo-tecnoagil" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Texto institucional e direitos autorais */}
        <p>
          Desenvolvido por Grupo Tecnoagil.
          <br />
          Copyright 2025 Grupo Tecnoagil. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
