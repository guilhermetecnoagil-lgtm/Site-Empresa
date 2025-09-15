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

  const LOADING_TIME = 2000; // tempo mínimo do loading
  const FADE_TIME = 1000;    // tempo da animação de saída

  useEffect(() => {
    const start = Date.now();

    // espera o carregamento completo da janela (imagens, fontes, css etc.)
    window.addEventListener("load", () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, LOADING_TIME - elapsed);

      setTimeout(() => setLoading(false), remaining);
    });
  }, []);

  // controla a desmontagem do loader após o fade-out
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoading(false), FADE_TIME);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Router>
      {/* Loading sempre por cima */}
      {showLoading && <LoadingScreen isExiting={!loading} />}

      {/* Site sempre carrega em background */}
      <div className="site-wrapper">
        <AppRoutes />

        {/* FAB e Modal só aparecem quando o loading terminar */}
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
