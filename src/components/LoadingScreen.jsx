import React from "react";
import "../styles/LoadingScreen.css";
import Logo from "../img/Logo.webp";

export default function LoadingScreen({ isExiting }) {
  return (
    <div className={`loading-screen ${isExiting ? "fade-out" : ""}`}>
      <div className="logo-container">
        <img src={Logo} alt="Logo Tecnoagil" className="logo" />
      </div>
      <div className="loading-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loading-message">
        Preparando tudo para sua experiência... <br></br>o carregamento pode levar alguns instantes.
      </p>
    </div>
  );
}
