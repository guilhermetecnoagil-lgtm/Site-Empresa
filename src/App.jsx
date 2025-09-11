// Importa React e hooks
import React, { useState } from "react";

// Estilos globais da aplicação
import "./styles/App.css";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Conjunto de rotas
import AppRoutes from "./routes/AppRoutes";
import FloatingFabTracker from "./components/FloatingFab";
import AssistenteModal from "./components/assistenteModal";

function App() {
  // Controle do modal
  const [assistenteAberto, setAssistenteAberto] = useState(false);

  return (
    <Router>
      <AppRoutes />

      {/* FAB some quando modal abre */}
      <FloatingFabTracker
        visible={!assistenteAberto}
        onClick={() => setAssistenteAberto(true)}
      />

      {/* Modal */}
      <AssistenteModal
        isOpen={assistenteAberto}
        onClose={() => setAssistenteAberto(false)}
      />
    </Router>
  );
}

export default App;
