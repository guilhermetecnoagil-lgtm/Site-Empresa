import { useEffect, useRef, useState } from "react";
import ted from "../img/tedThink.png";

/**
 * FAB com tooltip random, pulse contínuo e fala vermelha
 * Agora com animação de sumir/voltar quando modal abre/fecha
 */
export default function FloatingFabTracker({ onClick, visible = true }) {
  const hostRef = useRef(null);
  const [btn, setBtn] = useState(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    // ---- estilos globais ----
    if (!document.getElementById("__fab_tracker_style__")) {
      const styleEl = document.createElement("style");
      styleEl.id = "__fab_tracker_style__";
      styleEl.textContent = `
        @keyframes fab-pulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes fab-fade-in {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fab-fade-out {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.7); }
        }
        .fab-tracker {
          animation: fab-pulse 1.5s ease-in-out infinite;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .fab-hidden {
          animation: fab-fade-out 0.3s forwards;
          pointer-events: none;
        }
        .fab-visible {
          animation: fab-fade-in 0.3s forwards, fab-pulse 1.5s ease-in-out infinite;
        }
        .fab-tooltip {
          position: absolute;
          right: 100%;
          margin-right: 12px;
          top: 50%;
          transform: translateY(-50%) translateX(20px);
          background: #dc3545;
          color: #fff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-family: sans-serif;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .fab-tracker:hover .fab-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
      `;
      document.head.appendChild(styleEl);
    }

    // host
    const host = document.createElement("div");
    hostRef.current = host;
    Object.assign(host.style, {
      position: "absolute",
      left: "0px",
      top: "0px",
      width: "0px",
      height: "0px",
      zIndex: "2147483647",
      pointerEvents: "none",
      willChange: "transform",
    });
    document.body.appendChild(host);

    // botão
    const btnEl = document.createElement("button");
    btnEl.className = "fab-tracker fab-visible";
    btnEl.setAttribute("aria-label", "Contato / Assistente");
    const BTN_SIZE = 80;
    Object.assign(btnEl.style, {
      position: "absolute",
      width: `${BTN_SIZE}px`,
      height: `${BTN_SIZE}px`,
      borderRadius: "50%",
      border: "0",
      cursor: "pointer",
      background: "transparent",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      pointerEvents: "auto",
      outline: "none",
      overflow: "visible",
    });

    // ícone
    let iconUrl = null;
    try {
      if (typeof ted === "string" && ted) iconUrl = ted;
      else iconUrl = new URL("../img/tedi.png", import.meta.url).href;
    } catch {
      iconUrl = "/tedi.png";
    }
    const img = document.createElement("img");
    img.alt = "";
    img.width = BTN_SIZE;
    img.height = BTN_SIZE;
    img.style.display = "block";
    img.style.borderRadius = "50%";
    img.src = iconUrl;

    // tooltip
    const frases = [
      "Precisa de ajuda ?",
      "Fale com nosso assistente virtual",
      "O Ted está aqui para ajudar",
      "Alguma dúvida ?"
    ];
    const tooltip = document.createElement("span");
    tooltip.className = "fab-tooltip";
    tooltip.textContent = frases[0];

    btnEl.addEventListener("mouseenter", () => {
      const idx = Math.floor(Math.random() * frases.length);
      tooltip.textContent = frases[idx];
    });

    btnEl.appendChild(img);
    btnEl.appendChild(tooltip);

    btnEl.onclick = () => {
      if (typeof onClick === "function") {
        // animação sumindo
        btnEl.classList.remove("fab-visible");
        btnEl.classList.add("fab-hidden");
        setTimeout(() => {
          if (onClick) onClick();
        }, 300); // espera animação antes de abrir modal
      }
    };

    host.appendChild(btnEl);
    setBtn(btnEl);

    // comportamento fixed
    const RIGHT = 30, BOTTOM = 20;
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;

      const top = scrollTop + vh - BOTTOM - BTN_SIZE;
      const left = scrollLeft + vw - RIGHT - BTN_SIZE;

      host.style.transform = `translate(${left}px, ${top}px)`;
      requestAnimationFrame(update);
    };
    update();

    return () => {
      if (host.parentNode) host.parentNode.removeChild(host);
    };
  }, [onClick]);

  // controla a visibilidade vinda do App
  useEffect(() => {
    if (btn) {
      if (visible) {
        btn.classList.remove("fab-hidden");
        btn.classList.add("fab-visible");
      } else {
        btn.classList.remove("fab-visible");
        btn.classList.add("fab-hidden");
      }
    }
  }, [visible, btn]);

  return null;
}
