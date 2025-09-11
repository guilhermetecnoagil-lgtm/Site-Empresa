import React, { useEffect, useRef } from "react";
import "../styles/ParceirosSection.css";

// Logos dos parceiros (todas em uma faixa só)
import boticario from "../img/LogoBoticario.png";
import samur from "../img/LogoSamur.png";
import labo from "../img/LogoLabo.png";
import cincal from "../img/CincalLogo.png";
import jrlogo from "../img/JRLogo.png";
import roda from "../img/RodaleveLogo.png";
import sebrae from "../img/SebraeLogo.png";
import sonia from "../img/TiaSoniaLogo.png";
import sudoeste from "../img/TvSudoesteLogo.png";
import radio from "../img/RadioClubeLogo.png";
import luvep from "../img/LuvepLogo.png";
import band from "../img/BandFmLogo.png";
import bruno from "../img/JBrunoLogo.png";

const parceiros = [
  { nome: "O Boticário", logo: boticario },
  { nome: "Band FM", logo: band },
  { nome: "J. Bruno", logo: bruno },
  { nome: "Cincal", logo: cincal },
  { nome: "Luvep", logo: luvep },
  { nome: "Rádio Clube", logo: radio },
  { nome: "TV Sudoeste", logo: sudoeste },
  { nome: "Tia Sônia", logo: sonia },
  { nome: "JR", logo: jrlogo },
  { nome: "Roda Leve", logo: roda },
  { nome: "Sebrae", logo: sebrae },
  { nome: "Hospital Samur", logo: samur },
  { nome: "Labo", logo: labo },
];

export default function ParceirosSection() {
  const sectionRef = useRef(null);

  return (
    <section className="parceiros-section" id="parceiros" ref={sectionRef}>
      <div className="parceiros-carousel">
        <div className="parceiros-track loop loop-left">
          {[...parceiros, ...parceiros].map((p, i) => (
            <div className="parceiro" key={i}>
              <img src={p.logo} alt={p.nome} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
