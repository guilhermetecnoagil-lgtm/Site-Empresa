// Importa React e os hooks usados para estado e efeitos
import React, { useState, useEffect } from "react";
import "../styles/TypewriterText.css";

// Palavras que serão exibidas no efeito "máquina de escrever"
const words = ["Agilidade.", "Tecnologia.", "Segurança.", "Qualidade."];

const TypewriterText = () => {
  // Índice da palavra atual dentro do array 'words'
  const [index, setIndex] = useState(0);
  // Texto atualmente renderizado (parcial da palavra durante a digitação/remoção)
  const [text, setText] = useState("");
  // Flag para alternar entre digitar (false) e deletar (true)
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Palavra alvo com base no índice atual
    const currentWord = words[index];

    // Velocidade da animação muda quando está deletando/digitando
    const typeSpeed = isDeleting ? 80 : 150;

    // Função que avança um "frame" da animação
    const handleTyping = () => {
      if (isDeleting) {
        // Remove 1 caractere
        setText(currentWord.substring(0, text.length - 1));
      } else {
        // Adiciona 1 caractere
        setText(currentWord.substring(0, text.length + 1));
      }

      // Quando terminar de digitar a palavra inteira, espera 1s e começa a deletar
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
      // Quando terminar de deletar tudo, passa para a próxima palavra e volta a digitar
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    // Agenda o próximo passo da animação
    const timer = setTimeout(handleTyping, typeSpeed);

    // Limpeza do timeout ao reexecutar o efeito ou desmontar o componente
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]); // Reexecuta quando o texto, o modo ou o índice mudam

  // Renderiza o texto com classes para estilo (cor/efeito cursor no CSS)
  return <span className="typewriter red">{text}</span>;
};

export default TypewriterText;
