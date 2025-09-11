// Importa React e hooks usados no componente
import React, { useState, useEffect, useRef } from "react";

// Estilos e imagens da seção
import "../styles/EmpresaSectionMobile.css";
import imagem1 from "../img/Tecnoagil1.webp";
import imagem2 from "../img/Tecnoagil2.webp";
import imagem3 from "../img/Tecnoagil2.webp";

// Componente principal da seção da empresa
const EmpresaSection = () => {
  // 'destaque' guarda o índice do card atualmente em destaque (ou null se nenhum)
  const [destaque, setDestaque] = useState(null);

  // Array de referências para os cards flutuantes (um ref por card)
  const cardsRef = useRef([]);

  useEffect(() => {
    // Fecha o destaque ao clicar fora de TODOS os cards
    const handleClickFora = (event) => {
      // Verifica se o click não ocorreu dentro de nenhum card
      if (
        cardsRef.current.every((card) => card && !card.contains(event.target))
      ) {
        setDestaque(null);
      }
    };

    // Escuta cliques no documento
    document.addEventListener("mousedown", handleClickFora);

    // Limpa o listener ao desmontar o componente
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <section className="empresa-section">
      {/* Camada de overlay para efeitos visuais (gradiente/escurecimento) */}
      <div className="empresa-overlay"></div>

      <div className="empresa-content">
        {/* Bloco de texto com título, subtítulo e CTA */}
        <div className="empresa-text">
          <h1>GRUPO TECNOAGIL</h1>
          <p>
            TRANSFORMANDO VIDAS HÁ MAIS DE 18 ANOS COM SEGURANÇA, TECNOLOGIA E AGILIDADE
          </p>
          <a href="#contato">
            <button className="empresa-btn">Entrar em Contato</button>
          </a>
        </div>

        {/* Cards flutuantes com imagens posicionadas de forma absoluta */}
        <div className="empresa-floating">
          {[imagem1, imagem2, imagem3].map((img, i) => (
            <div
              key={i}
              // Armazena a referência DOM de cada card no array 'cardsRef'
              ref={(el) => (cardsRef.current[i] = el)}
              // Adiciona a classe "ativo" quando o card está em destaque
              className={`empresa-card ${destaque === i ? "ativo" : ""}`}
              // Posição e empilhamento dinâmicos por índice
              style={{
                top: `${i * 20}%`,          // desloca verticalmente cada card
                left: `${20 + i * 15}%`,    // desloca horizontalmente cada card
                zIndex: destaque === i ? 3 : 1, // traz o card ativo para frente
              }}
              onClick={(e) => {
                e.stopPropagation(); // evita que o clique "suba" para o document
                setDestaque(i);      // define este card como o ativo
              }}
            >
              {/* Imagem do card com alt descritivo */}
              <img src={img} alt={`Câmera ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicador visual para sugerir rolagem */}
      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default EmpresaSection;
