import React, { memo, useEffect, useRef, useState } from "react";
import "../styles/BracosSection.css"; // <- CONFIRA esse caminho/nome

const BRACOS = [
  { nome: "Tecnoagil ",  slogan: "Tecnologia, suporte e monitoramento",  logo: "/img/Braco4.avif" },
  { nome: "Cautela Segurança",   slogan: "Vigilância patrimonial & eletrônica", logo: "/img/Braco1.avif" },
  { nome: "Integra Automação",   slogan: "Automação residencial & corporativa",  logo: "/img/Braco3.avif" },
  { nome: "F&G Security",        slogan: "Segurança privada especializada",      logo: "/img/Braco2.avif" },
];

const LazyLogo = memo(function LazyLogo({ src, alt }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { rootMargin: "200px 0px", threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={inView ? src : undefined}
      alt={alt}
      className={`brx-logo ${inView ? "is-loaded" : ""}`}
      loading="lazy"
      decoding="async"
    />
  );
});

function BracosShowcase() {
  return (
    <section className="brx-section" id="bracos">
      <h2 className="brx-title">Nossos Braços</h2>
      <p className="brx-subtitle">Empresas do grupo que ampliam nossa atuação</p>

      <div className="brx-grid">
        {BRACOS.map((b) => (
          <article className="brx-card" key={b.nome} aria-label={b.nome}>
            <div className="brx-media">
              <LazyLogo src={b.logo} alt={b.nome} />
            </div>
            <div className="brx-info">
              <h3 className="brx-name">{b.nome}</h3>
              <p className="brx-slogan">{b.slogan}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(BracosShowcase);
