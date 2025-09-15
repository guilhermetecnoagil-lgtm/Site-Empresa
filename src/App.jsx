import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import FloatingFabTracker from "./components/FloatingFab";
import AssistenteModal from "./components/assistenteModal";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const LOADING_TIME = 5000;   // tempo mínimo do loader em ms
  const MAX_WAIT_TIME = 15000; // tempo máximo de espera em ms
  const FADE_TIME = 1000;      // tempo da animação de saída

  useEffect(() => {
    const start = Date.now();

    const handleFinish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    // dispara quando todos os recursos carregarem
    window.addEventListener("load", handleFinish);

    // timeout de segurança (se algo travar)
    const maxTimer = setTimeout(() => setLoading(false), MAX_WAIT_TIME);

    return () => {
      window.removeEventListener("load", handleFinish);
      clearTimeout(maxTimer);
    };
  }, []);

  // controla o fade do loader
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoading(false), FADE_TIME);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Router>
      {/* Loader em cima SEM tela branca */}
      {showLoading && <LoadingScreen isExiting={!loading} />}

      {/* Site sempre renderiza no fundo, só fica coberto pelo loader */}
      <div className={`site-wrapper ${showLoading ? "hidden-under-loader" : ""}`}>
        <AppRoutes />

        {!showLoading && (
          <>
            <FloatingFabTracker
              visible={!assistenteAberto}
              onClick={() => setAssistenteAberto(true)}
            />
            <AssistenteModal
              isOpen={assistenteAberto}
              onClose={() => setAssistenteAberto(false)}
            />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
