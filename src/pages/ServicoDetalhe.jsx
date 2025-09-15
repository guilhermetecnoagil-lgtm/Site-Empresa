// ServicoDetalhe.jsx
import { useParams, Link } from "react-router-dom";
import { servicos } from "../data/servicos";
import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/ServicoDetalhe.css";

/* ========= Carrossel simples ========= */
function Carousel({ images = [], autoPlayMs = 4000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayMs);
    return () => clearInterval(timerRef.current);
  }, [images.length, autoPlayMs]);

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="carousel-slide" key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* controles */}
      <button className="carousel-btn prev" onClick={prev}>
        ‹
      </button>
      <button className="carousel-btn next" onClick={next}>
        ›
      </button>

      {/* dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
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

  const mensagem = `Olá, gostaria de mais informações sobre o serviço: ${servico?.titulo}`;
  const whatsappUrl = `https://wa.me/7734210975?text=${encodeURIComponent(
    mensagem
  )}`;

  // 🔒 bloqueia scroll lateral
  useEffect(() => {
    const { body, documentElement: html } = document;
    body.style.overflowX = "hidden";
    html.style.overflowX = "hidden";
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

  // monta imagens: import estático + galeria do public
  const imagens = useMemo(() => {
    const galeria = Array.isArray(servico.galeria) ? servico.galeria : [];
    return [servico.imagem, ...galeria.filter((g) => g !== servico.imagem)];
  }, [servico]);

  return (
    <div className="folha-style">
      <div className="folha-content">
        <div className="title-hanging">
          <h1>{servico.titulo}</h1>
        </div>

        <div className="folha-main">
          <div className="desc-block">
            <p>{servico.descricaoLonga}</p>
          </div>

          <div className="folha-figure">
            <Carousel images={imagens} />
          </div>
        </div>

        <div className="folha-cta">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primario"
          >
            CONTRATE O SERVIÇO
          </a>
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
