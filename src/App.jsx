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
    const minTimer = setTimeout(() => setLoading(false), LOADING_TIME);
    const maxTimer = setTimeout(() => setLoading(false), MAX_WAIT_TIME);

    // se o site carregar antes (window.onload), libera após mínimo
    const handleLoad = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    const start = Date.now();
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", handleLoad);
    };
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
