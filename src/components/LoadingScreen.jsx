import React, { useEffect, useState } from "react";
import "../styles/LoadingScreen.css";
import Logo from "../img/Logo.webp";

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500); // ativa saída antes de desmontar
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="logo-container">
        <img src={Logo} alt="Logo Tecnoagil" className="logo" />
      </div>
      <div className="loading-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
