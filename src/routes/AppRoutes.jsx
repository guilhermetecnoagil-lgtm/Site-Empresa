// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading das páginas
const HomeResponsive = lazy(() => import("../pages/HomeResponsive"));
const ServicoDetalhe = lazy(() => import("../pages/ServicoDetalhe.jsx"));

const AppRoutes = () => (
  
    <Routes>
      {/* Home agora decide entre Desktop e Mobile automaticamente */}
      <Route path="/" element={<HomeResponsive />} />

      {/* Detalhes de serviços */}
      <Route path="/servicos/:slug" element={<ServicoDetalhe />} />

      {/* Rota fallback */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>

);

export default AppRoutes;
