import React, { memo } from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://pt-br.facebook.com/grupotecnoagil",
    icon: <FaFacebookF />,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/tecnoagil",
    icon: <FaInstagram />,
    label: "Instagram",
  },
  {
    href: "https://api.whatsapp.com/send?phone=557734210975&text=Olá!",
    icon: <FaWhatsapp />,
    label: "WhatsApp",
  },
  {
    href: "https://www.linkedin.com/company/grupo-tecnoagil",
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>
          GRUPO <span className="red">TECNOAGIL</span>
        </h2>

        <div className="footer-icons">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>

        <p>
          Desenvolvido por Grupo Tecnoagil.
          <br />
          &copy; {currentYear} Grupo Tecnoagil. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
