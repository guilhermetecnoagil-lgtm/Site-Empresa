// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/LoadingScreen";

// Lazy imports
const FloatingFabTracker = lazy(() => import("./components/FloatingFab"));
const AssistenteModal = lazy(() => import("./components/AssistenteModal"));

function App() {
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const LOADING_TIME = 3000;
  const MAX_WAIT_TIME = 15000;
  const FADE_TIME = 1000;

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("loaderShown");

    if (!alreadyLoaded) {
      setLoading(true);
      setShowLoading(true);

      const start = Date.now();
      const handleFinish = () => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, LOADING_TIME - elapsed);
        setTimeout(() => setLoading(false), remaining);
      };

      window.addEventListener("load", handleFinish);
      const maxTimer = setTimeout(() => setLoading(false), MAX_WAIT_TIME);

      return () => {
        window.removeEventListener("load", handleFinish);
        clearTimeout(maxTimer);
      };
    }
  }, []);

  // controla o fade
  useEffect(() => {
    if (!loading && showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        sessionStorage.setItem("loaderShown", "true");
      }, FADE_TIME);

      return () => clearTimeout(timer);
    }
  }, [loading, showLoading]);

  // 🔹 pré-carregar o modal em background
  useEffect(() => {
    import("./components/AssistenteModal");
  }, []);

  return (
    <Router>
      {showLoading && <LoadingScreen isExiting={!loading} />}

      <div className={`site-wrapper ${showLoading ? "hidden-under-loader" : ""}`}>
        <AppRoutes />

        {!showLoading && (
          <>
            {/* FAB leve → não precisa suspense */}
            <Suspense fallback={null}>
              <FloatingFabTracker
                visible={!assistenteAberto}
                onClick={() => setAssistenteAberto(true)}
              />
            </Suspense>

            {/* Modal pesado → suspense com loader */}
            {assistenteAberto && (
              <Suspense fallback={<div className="modal-loader">Carregando assistente...</div>}>
                <AssistenteModal
                  isOpen={assistenteAberto}
                  onClose={() => setAssistenteAberto(false)}
                />
              </Suspense>
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
