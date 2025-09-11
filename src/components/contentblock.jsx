// Importa React para permitir o uso de JSX e componentes funcionais
import React from 'react';

// Importa os estilos específicos do bloco de conteúdo
import '../styles/contentblock.css';

// Componente funcional ContentBlock
// Props:
// - id: usado para âncoras/navegação (e.g., links para #sobre)
// - title: título opcional exibido no topo do bloco
// - children: conteúdo interno passado entre <ContentBlock> ... </ContentBlock>
// - background: cor de fundo do bloco (padrão: branco ou var(--bg-base))
// - fadeTo: cor da próxima seção, usada para gerar um gradiente suave entre blocos
const ContentBlock = ({ id, title, children, background = '#fff', fadeTo = null }) => {
  return (
    // <section> semântica para um bloco de conteúdo da página.
    // Atribui um id para permitir navegação por âncora e uma classe para estilização.
    // Define a cor de fundo via variáveis CSS para suportar o gradiente com fadeTo.
    <section
      id={id}
      className={`content-block ${fadeTo ? 'has-gradient' : ''}`}
      style={{ '--bg-section': background, '--bg-next': fadeTo || background }}
    >
      {/* Container interno para controlar largura máxima, padding e layout pelo CSS */}
      <div className="content-inner">
        {/* Renderiza o título apenas se for fornecido */}
        {title && <h1>{title}</h1>}

        {/* Renderiza qualquer conteúdo passado como filho do componente */}
        {children}
      </div>
    </section>
  );
};

// Exporta o componente para uso em outras partes da aplicação
export default ContentBlock;
