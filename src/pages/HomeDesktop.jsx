import React from "react";
import Grid from "../components/grid";
import Topbar from "../components/topbar";
import ContentBlock from "../components/contentblock";
import ServicosSection from "../components/ServicosSection";
import ContatoSection from "../components/ContatoSection";
import Footer from "../components/Footer";
import EmpresaSection from "../components/EmpresaSection";
import ParceirosSection from "../components/ParceirosSection";
import MostruarioSection from "../components/MostruarioSection";
import QualidadeSection from "../components/QualidadeSection";

// ✅ importe o ícone flutuante

export default function HomeDesktop() {
  return (
    <>
      <Grid
        header={<Topbar />}
        
        main={
          <>
         
            {/* De bg-base para bg-contraste */}
            <ContentBlock id="empresa" background="var(--bg-base)" fadeTo="var(--bg-contraste)">
              <EmpresaSection />
            </ContentBlock>

            {/* De bg-contraste para bg-base */}
            <ContentBlock background="var(--bg-contraste)" fadeTo="var(--bg-base)">
              <QualidadeSection />
            </ContentBlock>

            {/* De bg-base para bg-contraste */}
            <ContentBlock id="servicos" background="var(--bg-base)" fadeTo="var(--bg-contraste)">
              <MostruarioSection />
            </ContentBlock>

            {/* De bg-contraste para bg-parceiros */}
            <ContentBlock background="var(--bg-contraste)" fadeTo="var(--bg-parceiros)">
              <ServicosSection />
            </ContentBlock>

            {/* De bg-parceiros para bg-base */}
            <ContentBlock background="var(--bg-parceiros)" fadeTo="var(--bg-contraste)">
              <ParceirosSection />
            </ContentBlock>

            {/* Última seção — sem gradiente abaixo */}
            <ContentBlock id="contato" background="var(--bg-base)" fadeTo="var(--bg-base)">
              <ContatoSection />
            </ContentBlock>
          </>
        }
        footer={
          <ContentBlock background="var(--bg-contraste)">
            
            <Footer />
          </ContentBlock>
        }
        />

    </>
  );
}
