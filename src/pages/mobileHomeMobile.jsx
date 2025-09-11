import React from "react";
import Grid from "../components/grid";
import Topbar from "../components/topbar";
import ContentBlock from "../components/contentblock";
import EmpresaSection from "../components/EmpresaSectionMobile";
import ServicosSection from "../components/ServicosSection";
import ContatoSection from "../components/ContatoSection";
import Parceiros from"../components/ParceirosSection";
import Footer from "../components/Footer";
import Qualidade from "../components/QualidadeSection"

export default function HomeMobile() {
  return (
    <Grid
      header={<Topbar />}
      main={
        <>
          {/* Home/empresa  */}
          <ContentBlock id="empresa" background="#fff">
            <EmpresaSection/>
          </ContentBlock>
          <ContentBlock id="qualidade">
            <Qualidade></Qualidade>
          </ContentBlock>

          {/* Serviços (slider) */}
          <ContentBlock>
            <ServicosSection />
          </ContentBlock>
    <ContentBlock>
<Parceiros/>
    </ContentBlock>
          {/* Contato */}
          <ContentBlock id="contato" background="#fff">
            <ContatoSection/>
          </ContentBlock>


        </>
      }
      footer={<Footer/>}
    />
  );
}
