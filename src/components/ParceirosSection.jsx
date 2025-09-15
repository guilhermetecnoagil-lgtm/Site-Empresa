// src/components/ParceirosSection.jsx
import React, { useRef } from "react";
import "../styles/ParceirosSection.css";

// Lista com slug + import dinâmico (melhor que importar tudo de cara)
const parceiros = [
  { nome: "O Boticário", logo: () => import("../img/LogoBoticario.webp") },
  { nome: "Band FM", logo: () => import("../img/BandFmLogo.webp") },
  { nome: "J. Bruno", logo: () => import("../img/JBrunoLogo.webp") },
  { nome: "Cincal", logo: () => import("../img/CincalLogo.webp") },
  { nome: "Luvep", logo: () => import("../img/LuvepLogo.webp") },
  { nome: "Rádio Clube", logo: () => import("../img/RadioClubeLogo.webp") },
  { nome: "TV Sudoeste", logo: () => import("../img/TvSudoesteLogo.webp") },
  { nome: "Tia Sônia", logo: () => import("../img/TiaSoniaLogo.webp") },
  { nome: "JR", logo: () => import("../img/JRLogo.webp") },
  { nome: "Roda Leve", logo: () => import("../img/RodaleveLogo.webp") },
  { nome: "Sebrae", logo: () => import("../img/SebraeLogo.webp") },
  { nome: "Hospital Samur", logo: () => import("../img/LogoSamur.webp") },
  { nome: "Labo", logo: () => import("../img/LogoLabo.webp") },
];

// 🔹 LazyImage para não carregar tudo de uma vez
const LazyLogo = ({ logo, alt }) => {
  const [src, setSrc] = React.useState(null);
  const imgRef = useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const mod = await logo();
            setSrc(mod.default);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [logo]);

  return (
    <img
      ref={imgRef}
      src={src || ""}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

export default function ParceirosSection() {
  const sectionRef = useRef(null);

  return (
    <section className="parceiros-section" id="parceiros" ref={sectionRef}>
      <div className="parceiros-carousel">
        <div className="parceiros-track loop loop-left">
          {parceiros.map((p, i) => (
            <div className="parceiro" key={i}>
              <LazyLogo logo={p.logo} alt={p.nome} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
