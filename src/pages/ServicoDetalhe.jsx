// ServicoDetalhe.jsx
import { useParams, Link } from "react-router-dom";
import { servicos } from "../data/servicos";
import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/ServicoDetalhe.css";

/* ========= Carrossel 3D - animação de pilha ========= */
function CarouselStack3D({ images = [], autoPlayMs = 3200 }) {
  const [index, setIndex] = useState(0);
  const wrap = (n) => (n + images.length) % images.length;
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  

  const next = () => setIndex((i) => wrap(i + 1));
  const prev = () => setIndex((i) => wrap(i - 1));

  // autoplay com pausa no hover
  useEffect(() => {
    const start = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(next, autoPlayMs);
    };
    const stop = () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
    start();
    const el = containerRef.current;
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    return () => {
      stop();
      el?.removeEventListener("mouseenter", stop);
      el?.removeEventListener("mouseleave", start);
    };
  }, [autoPlayMs, images.length]);

  // posições da pilha (centro, 2 atrás e 2 à frente)
  const slots = [-2, -1, 0, 1, 2];

  return (
    <div className="stack3d" ref={containerRef} aria-roledescription="carousel">
      <div className="stack3d-stage" style={{ perspective: "1200px" }}>
        {slots.map((offset) => {
          const imgIndex = wrap(index + offset);
          const depth = -Math.abs(offset) * 140; // distancia no eixo Z
          const tilt = offset * 2.5;             // leve rotação para efeito de pilha
          const shift = offset * 36;             // afastamento horizontal
          const scale = 1 - Math.abs(offset) * 0.06;

          return (
            <div
              key={`${imgIndex}-${offset}`}
              className={`stack3d-card ${offset === 0 ? "is-front" : "is-back"}`}
              style={{
                transform: `translateX(${shift}px) translateZ(${depth}px) rotateY(${tilt}deg) scale(${scale})`,
                zIndex: 100 - Math.abs(offset),
                backgroundImage: `url(${images[imgIndex]})`,
              }}
              role={offset === 0 ? "group" : undefined}
              aria-label={`Imagem ${imgIndex + 1} de ${images.length}`}
            />
          );
        })}
      </div>

      <button className="stack3d-nav prev" onClick={prev} aria-label="Anterior">‹</button>
      <button className="stack3d-nav next" onClick={next} aria-label="Próximo">›</button>

      <div className="stack3d-dots" role="tablist" aria-label="Páginas do carrossel">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir para imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
/* ========= fim do carrossel ========= */

export default function ServicoDetalhe() {
  
  const { slug } = useParams();
  const servico = servicos.find((s) => s.slug === slug);
const mensagem = `Olá, gostaria de mais informações sobre o serviço: ${servico.titulo}`;
const whatsappUrl = `https://wa.me/7734210975?text=${encodeURIComponent(mensagem)}`;
  // 🔒 sem scroll só nesta página
  useEffect(() => {
    const { body, documentElement: html } = document;
   
    return () => {
      body.style.overflow = "";
      html.style.overflow = "";
    };
  }, []);

  if (!servico) {
    return (
      <main className="folha-style">
        <div className="folha-content">
          <h1>Serviço não encontrado</h1>
          <Link to="/#servicos" className="back-link">
            <span className="arrow-left" /> Voltar
          </Link>
        </div>
      </main>
    );
  }

  // Usa servico.galeria (se existir) ou repete a principal para formar a pilha
  const imagens = useMemo(() => {
    const gal = Array.isArray(servico.galeria) && servico.galeria.length > 0
      ? servico.galeria
      : [servico.imagem, servico.imagem, servico.imagem, servico.imagem];
    // remove falsy e normaliza caminhos
    return gal.filter(Boolean);
  }, [servico]);

  return (
    <div className="folha-style">
      <div className="folha-content">
        <div className="title-hanging">
          <h1>{servico.titulo}</h1>
        </div>

        <div className="folha-main">
          <div className="desc-block">
            <p>
             {servico.descricaoLonga}
            </p>
          </div>

          {/* === carrossel 3D no lugar da imagem === */}
          <div className="folha-figure">
            <CarouselStack3D images={servico.galeria} />
          </div>
        </div>

        <div className="folha-cta">
          <a href={whatsappUrl}  target="_blank"
    rel="noopener noreferrer"className="btn-primario">CONTRATE O SERVIÇO</a>
        </div>

        <div className="folha-footer">
          <a href="/" className="back-link">
            <span className="arrow-left"></span> Voltar
          </a>
        </div>
      </div>
    </div>
  );
}
