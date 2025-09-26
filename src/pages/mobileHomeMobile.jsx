import React, { lazy, Suspense } from "react";
import Grid from "../components/grid";
import Topbar from "../components/topbar";
import ContentBlock from "../components/contentblock";
import EmpresaSection from "../components/EmpresaSectionMobile";
import Footer from "../components/Footer";
import SectionLoader from "../components/SectionLoader"; // ✅ loader genérico

// Lazy imports
const ServicosSection = lazy(() => import("../components/ServicosSection"));
const ContatoSection = lazy(() => import("../components/ContatoSection"));
const ParceirosSection = lazy(() => import("../components/ParceirosSection"));
const QualidadeSection = lazy(() => import("../components/QualidadeSection"));

// 🔹 Wrapper para reduzir repetição
const LazyBlock = ({ id, background, fadeTo, height, children }) => (
  <ContentBlock id={id} background={background} fadeTo={fadeTo}>
    <Suspense fallback={<SectionLoader height={height} />}>
      {children}
    </Suspense>
  </ContentBlock>
);

export default function HomeMobile() {
  return (
    <Grid
      header={<Topbar />}
      main={
        <>
          {/* Empresa (carregamento imediato) */}
          <ContentBlock id="empresa" background="#fff">
            <EmpresaSection />
          </ContentBlock>

          {/* Qualidade */}
          <LazyBlock id="qualidade" height="250px">
            <QualidadeSection />
          </LazyBlock>

          {/* Serviços */}
          <LazyBlock height="400px">
            <ServicosSection />
          </LazyBlock>

          {/* Parceiros */}
          <LazyBlock height="200px">
            <ParceirosSection />
          </LazyBlock>

          {/* Contato */}
          <LazyBlock id="contato" background="#fff" height="300px">
            <ContatoSection />
          </LazyBlock>
        </>
      }
      footer={<Footer />}
    />
  );
}
