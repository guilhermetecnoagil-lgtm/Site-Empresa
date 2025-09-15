import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import FloatingFabTracker from "./components/FloatingFab";
import AssistenteModal from "./components/assistenteModal";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // simula carregamento
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Loading cobre tudo */}
      {loading && <LoadingScreen />}

      {/* Site com efeito de entrada */}
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
