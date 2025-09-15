// src/data/servicos.js
// 🔹 Importa apenas as imagens principais (usadas no LCP / listagens)
import imgPortaria from "../img/Tecnoagil1.webp";
import imgMonitoramento from "../img/monitoramento.webp";
import imgControle from "../img/ControleDeAcesso.webp";
import imgRastreamento from "../img/RastreamentoVeicular.webp";
import imgVideo from "../img/Empresa.webp";
import imgAutomacao from "../img/Automacao.webp";
import imgIncendio from "../img/Incendio.webp";
import imgSolar from "../img/PainelSolar.webp";
import imgRede from "../img/RedeEstruturada.webp";
import imgTelefonia from "../img/telefonia.webp";
import imgTerceirizacao from "../img/Tecnoagil4.webp";

export const servicos = [
  {
    slug: "portaria-remota",
    titulo: "Portaria Remota",
    descricao:
      "Controle de acesso à distância com tecnologia de ponta, reduzindo custos e aumentando a segurança.",
    descricaoLonga:
      "A Portaria Remota permite o controle de acesso totalmente digital e monitorado em tempo real, reduzindo custos operacionais e aumentando a segurança.",
    imagem: imgPortaria,
    galeria: ["/img/portaria2.webp", "/img/portaria3.webp"],
  },
  {
    slug: "monitoramento-24horas",
    titulo: "Monitoramento 24h",
    descricao: "Vigilância contínua com equipe especializada e tecnologia de ponta.",
    descricaoLonga:
      "Monitoramento em tempo real, com central equipada e pronta para agir preventivamente em ocorrências.",
    imagem: imgMonitoramento,
    galeria: ["/img/monitoramento2.webp", "/img/monitoramento3.webp"],
  },
  {
    slug: "controle-de-acesso",
    titulo: "Controle de Acesso",
    descricao: "Sistemas inteligentes para entrada e saída com autenticação segura.",
    descricaoLonga:
      "Gestão de acessos via biometria, QR Code ou reconhecimento facial, com registros detalhados e integração a câmeras.",
    imagem: imgControle,
    galeria: ["/img/controle2.webp", "/img/controle3.webp"],
  },
  {
    slug: "rastreamento-veicular",
    titulo: "Rastreamento Veicular",
    descricao: "Acompanhe a localização e histórico de deslocamentos dos seus veículos em tempo real.",
    descricaoLonga:
      "Monitoramento de rotas, alertas de velocidade e relatórios completos para gestão de frotas.",
    imagem: imgRastreamento,
    galeria: ["/img/rastreamento2.webp", "/img/rastreamento3.webp"],
  },
  {
    slug: "video-monitoramento",
    titulo: "Video-monitoramento",
    descricao: "Câmeras de alta definição integradas a sistemas inteligentes.",
    descricaoLonga:
      "Acompanhe ambientes internos e externos em tempo real, com visão noturna e gravação em nuvem.",
    imagem: imgVideo,
    galeria: ["/img/video2.webp", "/img/video3.webp"],
  },
  {
    slug: "automacao",
    titulo: "Automação Residencial",
    descricao: "Controle integrado de iluminação, climatização, câmeras e alarmes.",
    descricaoLonga:
      "Mais eficiência energética, segurança e praticidade com automação inteligente.",
    imagem: imgAutomacao,
    galeria: ["/img/auto1.webp", "/img/auto2.webp"],
  },
  {
    slug: "terceirizacao-de-mao-de-obra",
    titulo: "Terceirização de Mão de Obra",
    descricao: "Profissionais capacitados para portaria, vigilância, limpeza e manutenção.",
    descricaoLonga:
      "Reduza custos trabalhistas e aumente a eficiência com profissionais qualificados.",
    imagem: imgTerceirizacao,
    galeria: ["/img/terceiro2.webp", "/img/terceiro3.webp"],
  },
  {
    slug: "sistemas-de-incendio",
    titulo: "Sistemas de Incêndio",
    descricao: "Projetos de prevenção e combate a incêndios.",
    descricaoLonga:
      "Inclui detectores de fumaça, sprinklers automáticos e integração com central 24h.",
    imagem: imgIncendio,
    galeria: ["/img/incendio2.webp", "/img/incendio3.webp"],
  },
  {
    slug: "rede-estruturada",
    titulo: "Rede Estruturada",
    descricao: "Infraestrutura de rede moderna e segura.",
    descricaoLonga:
      "Cabeamento de alta performance, redundância e escalabilidade para empresas.",
    imagem: imgRede,
    galeria: ["/img/rede2.webp", "/img/rede3.webp"],
  },
  {
    slug: "telefonia-ip",
    titulo: "Telefonia IP",
    descricao: "Comunicação corporativa de alta qualidade e baixo custo.",
    descricaoLonga:
      "Chamadas de voz e vídeo via internet, gravações e integração com softwares de atendimento.",
    imagem: imgTelefonia,
    galeria: ["/img/telefone2.webp", "/img/telefone3.webp"],
  },
  {
    slug: "energia-solar",
    titulo: "Energia Solar",
    descricao: "Soluções completas em energia fotovoltaica.",
    descricaoLonga:
      "Projetos personalizados com instalação de painéis solares, inversores e monitoramento.",
    imagem: imgSolar,
    galeria: ["/img/solar2.webp", "/img/solar3.webp"],
  },
];
