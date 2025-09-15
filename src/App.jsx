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

  const LOADING_TIME = 3000; // tempo mínimo do loader em ms
  const FADE_TIME = 1000;    // tempo da animação de saída

  useEffect(() => {
    // Garante que o loading fique no mínimo X ms
    const timer = setTimeout(() => setLoading(false), LOADING_TIME);
    return () => clearTimeout(timer);
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
