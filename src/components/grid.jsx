// Importa React para permitir uso de JSX em componentes funcionais
import React from 'react';

// Importa os estilos específicos do layout em grid
import '../styles/grid.css';

// Componente de layout genérico baseado em CSS Grid
// Props:
// - header: conteúdo/JSX a ser renderizado no cabeçalho
// - main: conteúdo/JSX principal da página
// - footer: conteúdo/JSX do rodapé
const Grid = ({ header, main, footer }) => {
  return (
    // Contêiner raiz que provavelmente define o grid no CSS
    <div className="site-grid">
      
      {/* Área de cabeçalho do site */}
      <header className="site-header">{header}</header>

      {/* Área principal de conteúdo */}
      <main className="site-main">{main}</main>

      {/* Área de rodapé do site */}
      <footer className="site-footer">{footer}</footer>

    </div>
  );
};

// Exporta o componente para uso em outras partes da aplicação
export default Grid;
