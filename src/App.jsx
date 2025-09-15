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

  const LOADING_TIME = 2000; // tempo mínimo
  const FADE_TIME = 1000;    // tempo da animação

  useEffect(() => {
    const start = Date.now();

    // espera tudo (imagens, CSS, fontes externas)
    window.addEventListener("load", () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, LOADING_TIME - elapsed);

      // espera o mínimo + o fade
      setTimeout(() => setLoading(false), remaining);
    });
  }, []);

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

      {/* Site já monta em background */}
      <div className="site-wrapper">
        <AppRoutes />

        <FloatingFabTracker
          visible={!assistenteAberto}
          onClick={() => setAssistenteAberto(true)}
        />
        <AssistenteModal
          isOpen={assistenteAberto}
          onClose={() => setAssistenteAberto(false)}
        />
      </div>
    </Router>
  );
}

export default App;
