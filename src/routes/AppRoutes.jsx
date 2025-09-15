import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServicoDetalhe from '../pages/ServicoDetalhe.jsx';



// Wrapper que escolhe Desktop/Mobile
import HomeResponsive from '../pages/HomeResponsive';

const AppRoutes = () => (
  <Routes>
    {/* Home agora decide entre Desktop e Mobile automaticamente */}
    <Route path="/" element={<HomeResponsive />} />

    
  
    <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
    <Route path="*" element={<div>Página não encontrada</div>} />
  </Routes>
);

export default AppRoutes;
