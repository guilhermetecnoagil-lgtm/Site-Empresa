// App.js
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

  const LOADING_TIME = 4000; // tempo fixo em ms (ex: 4s)
  const FADE_TIME = 1000;    // tempo do fade-out (ms)

  // aguarda carregar tudo (simulação com timeout)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // inicia fade-out
    }, LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  // desmonta só após o fade terminar
  useEffect(() => {
    if (!loading) {
      const fadeTimer = setTimeout(() => setShowLoading(false), FADE_TIME);
      return () => clearTimeout(fadeTimer);
    }
  }, [loading]);

  return (
    <Router>
      {/* Loading cobre tudo */}
      {showLoading && <LoadingScreen isExiting={!loading} />}

      {/* Site aparece só depois */}
      <div className={`site-wrapper ${loading ? "hidden" : "site-enter"}`}>
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
