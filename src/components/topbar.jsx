// React e hooks
import React, { useEffect, useState, useCallback } from 'react';

// Estilos e ícones
import '../styles/topbar.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

// Firebase Auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

// Ícones do modo claro/escuro
import { Sun, Moon } from "lucide-react";

// Logomarca
import Logo from "../img/Logo.webp";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [acessosOpen, setAcessosOpen] = useState(false);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fecha dropdown ao fechar menu
  useEffect(() => {
    if (!menuOpen) setAcessosOpen(false);
  }, [menuOpen]);

  // Fechar com ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Trava/destrava scroll do body quando menu aberto
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
     
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  // Fecha menu ao mudar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const handleLogout = async () => {
    try { await signOut(auth); setUser(null); }
    catch (err) { console.error('Erro ao deslogar:', err); }
  };

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  // Links fecham o painel mobile
  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  // Toggle do dropdown Acessos (controla mobile; no desktop abre por hover via CSS)
  const toggleAcessos = (e) => {
    e.stopPropagation();
    setAcessosOpen(v => !v);
  };

  return (
    <header className={`topbar futuristic-glass ${menuOpen ? 'is-open' : ''}`}>
      {/* Esquerda: logo e marca */}
      <div className="topbar-left">
        <img src={Logo} alt="Logo" className="topbar-logo neon-glow" />
        <div className="topbar-title-group">
          <span className="grupo">GRUPO</span>
          <span className="tecnoagil">TECNOAGIL</span>
        </div>
      </div>

      {/* Botão hambúrguer (mobile) */}
      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(v => !v)}
      >
        <span className="bar" />
      </button>

      {/* Backdrop real (fecha ao clicar fora) */}
      {menuOpen && (
        <button
          className="menu-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navegação principal */}
      <nav
        id="primary-navigation"
        className="topbar-center"
        onClick={(e) => e.stopPropagation()}
      >
        <a href="#empresa" onClick={handleNavClick}>A Empresa</a>
        <a href="#servicos" onClick={handleNavClick}>Serviços</a>
        <a href="#contato" onClick={handleNavClick}>Contato</a>

        {/* Dropdown Acessos */}
        <div className={`dropdown ${acessosOpen ? 'is-dd-open' : ''}`}>
          <button
            className="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={acessosOpen}
            onClick={toggleAcessos}
          >
            Acessos <span className="arrow">▾</span>
          </button>

          <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
  <a
    href="https://grupotecnoagil.softruck.com/access/login"
    target="_blank"
    rel="noreferrer"
    onClick={handleNavClick}
  >
    Meu Rastreador
  </a>
  <a
    href="http://grupotecnoagil.ddns.com.br:9596/portalservice/#/login"
    onClick={handleNavClick}
  >
    Portal do Cliente
  </a>
 </div>

        </div>

        {/* Assistente virtual */}

        {/* ====== EXTRAS NO MOBILE: ícones sociais + toggle de tema ====== */}
        <div className="mobile-extras">
          <div className="social-icons">
            <a href="https://pt-br.facebook.com/grupotecnoagil" ><FaFacebookF /></a>
            <a href="https://www.instagram.com/tecnoagil"><FaInstagram /></a>
            <a href="https://api.whatsapp.com/send?phone=557734210975&text=Olá!"><FaWhatsapp /></a>
            <a href="https://www.linkedin.com/company/grupo-tecnoagil"><FaLinkedinIn /></a>
             <button className="dark-toggle neon-button" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          </div>
         
        </div>
        {/* ============================================================= */}
      </nav>

      {/* Direita (desktop): redes e tema */}
      <div className="topbar-right social-icons">
               <a href="https://pt-br.facebook.com/grupotecnoagil" ><FaFacebookF /></a>
            <a href="https://www.instagram.com/tecnoagil"><FaInstagram /></a>
            <a href="https://api.whatsapp.com/send?phone=557734210975&text=Olá!"><FaWhatsapp /></a>
            <a href="https://www.linkedin.com/company/grupo-tecnoagil"><FaLinkedinIn /></a>

  <button className="dark-toggle neon-button" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      
      </div>
    </header>
  );
};

export default Topbar;
