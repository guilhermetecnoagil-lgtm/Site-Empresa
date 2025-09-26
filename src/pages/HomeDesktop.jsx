import React, { Suspense, lazy, useEffect } from "react";
import Grid from "../components/grid";
import Topbar from "../components/topbar";
import ContentBlock from "../components/contentblock";
import Footer from "../components/Footer";
import EmpresaSection from "../components/EmpresaSection";
import SectionLoader from "../components/SectionLoader";
import BracosSection from "../components/BracosSection"; // ✅ import corrigido

// Lazy imports
const ServicosSection = lazy(() => import("../components/ServicosSection"));
const ContatoSection = lazy(() => import("../components/ContatoSection"));
const ParceirosSection = lazy(() => import("../components/ParceirosSection"));
const MostruarioSection = lazy(() => import("../components/MostruarioSection"));
const QualidadeSection = lazy(() => import("../components/QualidadeSection"));

// 🔹 Wrapper para reduzir repetição
const LazyBlock = ({ id, background, fadeTo, height, children }) => (
  <ContentBlock id={id} background={background} fadeTo={fadeTo}>
    <Suspense fallback={<SectionLoader height={height} />}>
      {children}
    </Suspense>
  </ContentBlock>
);

export default function HomeDesktop() {
  useEffect(() => {
    const el = document.getElementById("parceiros");
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        import("../components/ParceirosSection");
        observer.disconnect();
      }
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Grid
      header={<Topbar />}
      main={
        <>
          <ContentBlock
            id="empresa"
            background="var(--bg-base)"
            fadeTo="var(--bg-contraste)"
          >
            <EmpresaSection />
          </ContentBlock>

          <LazyBlock background="var(--bg-contraste)" fadeTo="var(--bg-base)" height="250px">
            <QualidadeSection />
          </LazyBlock>

          <LazyBlock id="servicos" background="var(--bg-base)" fadeTo="var(--bg-contraste)" height="400px">
            <MostruarioSection />
          </LazyBlock>

          <LazyBlock background="var(--bg-contraste)" fadeTo="var(--bg-parceiros)" height="350px">
            <ServicosSection />
          </LazyBlock>

          <LazyBlock id="parceiros" background="var(--bg-parceiros)" fadeTo="var(--bg-base)" height="200px">
            <ParceirosSection />
          </LazyBlock>

          {/* ✅ nova seção Bracos (fixa, sem lazy porque é leve) */}
          <ContentBlock background="var(--bg-base)" fadeTo="var(--bg-contraste)">
            <BracosSection />
          </ContentBlock>

          <LazyBlock id="contato" background="var(--bg-base)" fadeTo="var(--bg-base)" height="300px">
            <ContatoSection />
          </LazyBlock>
        </>
      }
      footer={
        <ContentBlock background="var(--bg-contraste)">
          <Footer />
        </ContentBlock>
      }
    />
  );
}
