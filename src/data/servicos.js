// src/data/servicos.js
import imagem1 from "../img/Tecnoagil1.jpg";
import imagem2 from "../img/monitoramento.jpg";
import imagem3 from "../img/ControleDeAcesso.jpg";
import imagem4 from "../img/RastreamentoVeicular.jpeg";
import imagem5 from "../img/Empresa.jpg";
import imagem6 from "../img/Automacao.jpg";
import imagem7 from "../img/Incendio.jpg";
import imagem8 from "../img/PainelSolar.jpg";
import imagem9 from "../img/RedeEstruturada.jpg";
import imagem10 from "../img/Tecnoagil4.jpg";
import imagem11 from "../img/telefonia.jpg";
import imagem12 from "../img/portaria2.png"
import imagem13 from "../img/portaria3.png"
import imagem14 from "../img/monitoramento2.png"
import imagem15 from "../img/monitoramento3.png"
import imagem16 from "../img/controle2.png"
import imagem17 from "../img/controle3.png"
import imagem18 from "../img/rastreamento2.png"
import imagem19 from "../img/rastreamento3.png"
import imagem20 from "../img/video2.png"
import imagem21 from "../img/video3.png"
import imagem22 from "../img/auto1.png"
import imagem23 from "../img/auto2.png"
import imagem24 from "../img/terceiro2.jpg"
import imagem25 from "../img/terceiro3.jpg"
import imagem26 from "../img/incendio2.png"
import imagem27 from "../img/incendio3.png"
import imagem28 from '../img/rede2.png'
import imagem29 from '../img/rede3.png'
import imagem30 from '../img/telefone2.png'
import imagem31 from '../img/telefone3.png'
import imagem32 from "../img/solar2.png"
import imagem33 from "../img/solar3.png"
export const servicos = [
  {
    slug: "portaria-remota",
    titulo: "Portaria Remota",
    descricao: "Controle de acesso à distância com tecnologia de ponta, reduzindo custos e aumentando a segurança de condomínios e empresas.",
    descricaoLonga:
      "A Portaria Remota é uma solução inovadora que permite o controle de acesso de forma totalmente digital e monitorada em tempo real. Com esse sistema, é possível reduzir custos operacionais, aumentar a segurança dos moradores e visitantes, e garantir registros detalhados de todas as entradas e saídas. \nAlém disso, a solução oferece integração com sistemas de câmeras e alarmes, proporcionando respostas rápidas a incidentes e garantindo mais tranquilidade ao cliente.",
    imagem: imagem1,
    galeria: [imagem1, imagem12, imagem13],
  },
  {
    slug: "monitoramento-24horas",
    titulo: "Monitoramento 24h",
    descricao: "Vigilância contínua realizada por profissionais treinados, garantindo proteção e respostas rápidas a qualquer ocorrência.",
    descricaoLonga:
      "Nosso serviço de Monitoramento 24h conta com uma central equipada com tecnologia de última geração e equipe especializada para atuar de forma preventiva e reativa.\n A vigilância contínua permite identificar movimentações suspeitas, disparo de alarmes, falhas elétricas ou incêndios, acionando imediatamente as autoridades competentes. É a tranquilidade de saber que seu patrimônio está protegido todos os dias, em qualquer horário.",
    imagem: imagem2,
    galeria: [imagem2, imagem14, imagem15],
  },
  {
    slug: "controle-de-acesso",
    titulo: "Controle de Acesso",
    descricao: "Sistemas inteligentes para gerenciar a entrada e saída de pessoas e veículos, com registros e autenticação segura.",
    descricaoLonga:
      "O Controle de Acesso oferece uma gestão eficiente para empresas, condomínios e residências, garantindo segurança e praticidade. A solução pode ser implementada com cartões de proximidade, biometria, QR Code ou até reconhecimento facial, sempre registrando horários e usuários de forma automatizada. \nAlém disso, é possível integrar com câmeras e relatórios personalizados, permitindo análise de fluxo e auditoria de acessos.",
    imagem: imagem3,
    galeria: [imagem3, imagem16, imagem17],
  },
  {
    slug: "rastreamento-veicular",
    titulo: "Rastreamento Veicular",
    descricao: "Acompanhe a localização e histórico de deslocamentos dos seus veículos em tempo real, com alertas e relatórios detalhados.",
    descricaoLonga:
      "O Rastreamento Veicular oferece muito mais que localização em tempo real. Nosso sistema permite o monitoramento de rotas, alertas de velocidade, paradas não autorizadas e desvios de trajeto, além de gerar relatórios completos para gestão de frotas. A solução contribui para maior segurança dos motoristas e veículos, redução de custos com combustível e manutenção preventiva.",
    imagem: imagem4,
    galeria: [imagem4, imagem18, imagem19],
  },
  {
    slug: "video-monitoramento",
    titulo: "Video-monitoramento",
    descricao: "Câmeras de alta definição integradas a sistemas inteligentes para vigilância constante de ambientes internos e externos.",
    descricaoLonga:
      "Com o Video-monitoramento é possível acompanhar ambientes em tempo real de qualquer dispositivo conectado à internet. As câmeras de alta definição oferecem visão noturna, gravação em nuvem e integração com alarmes e controle de acesso. Esse serviço aumenta a proteção contra furtos, invasões e vandalismos, além de proporcionar mais segurança para colaboradores e clientes.",
    imagem: imagem5,
    galeria: [imagem5, imagem20, imagem21],
  },
  {
    slug: "automacao",
    titulo: "Automação Residencial",
    descricao: "Controle e integração de sistemas para otimizar processos, aumentar a segurança e reduzir custos operacionais.",
    descricaoLonga:
      "A Automação predial e residencial traz mais conforto, segurança e eficiência para os ambientes. Com um único sistema integrado, é possível controlar iluminação, climatização, câmeras, alarmes e até portões de forma prática e inteligente. Além de reduzir o consumo de energia, a automação oferece relatórios detalhados que auxiliam na tomada de decisões e na modernização dos espaços.",
    imagem: imagem6,
    galeria: [imagem6, imagem22, imagem23],
  },
  {
    slug: "terceirizacao-de-mao-de-obra",
    titulo: "Terceirização de Mão de Obra",
    descricao: "Profissionais capacitados para serviços de portaria, vigilância, limpeza e manutenção, garantindo qualidade e eficiência.",
    descricaoLonga:
      "Nossa Terceirização de Mão de Obra oferece profissionais qualificados e treinados para atender às necessidades específicas de cada cliente. Seja na portaria, vigilância, recepção, limpeza ou manutenção, garantimos mão de obra especializada que traz mais eficiência, redução de custos trabalhistas e maior foco no core business da empresa contratante.",
    imagem: imagem10,
    galeria: [imagem10, imagem24, imagem25],
  },
  {
    slug: "sistemas-de-incendio",
    titulo: "Sistemas de Incêndio",
    descricao: "Projetos e instalação de sistemas de prevenção e combate a incêndios, com detectores, alarmes e extinção automática.",
    descricaoLonga:
      "Os Sistemas de Incêndio são fundamentais para garantir a segurança de pessoas e patrimônios. Trabalhamos com projetos personalizados que incluem detectores de fumaça e calor, alarmes sonoros e visuais, sistemas de sprinklers automáticos e integração com a central de monitoramento 24h. Dessa forma, é possível agir de maneira imediata em casos de emergência, reduzindo riscos e evitando grandes prejuízos.",
    imagem: imagem7,
    galeria: [imagem7, imagem26, imagem27],
  },
  {
    slug: "rede-estruturada",
    titulo: "Rede Estruturada",
    descricao: "Infraestrutura de rede moderna e segura para garantir desempenho, conectividade e escalabilidade na sua empresa.",
    descricaoLonga:
      "A Rede Estruturada é a base para a comunicação eficiente dentro das empresas. Nossos projetos incluem cabeamento de alta performance, organização de racks, switches gerenciáveis e soluções de redundância para evitar falhas. Uma infraestrutura bem planejada permite maior escalabilidade, redução de custos de manutenção e segurança no tráfego de dados.",
    imagem: imagem9,
    galeria: [imagem9, imagem28, imagem29],
  },
  {
    slug: "telefonia-ip",
    titulo: "Telefonia IP",
    descricao: "Comunicação corporativa de alta qualidade e baixo custo, integrando voz, vídeo e dados pela rede de internet.",
    descricaoLonga:
      "A Telefonia IP proporciona comunicação moderna, integrada e acessível. Através da rede de internet, é possível realizar chamadas com qualidade superior, integrar vídeo e voz, além de reduzir drasticamente os custos com ligações. O sistema também permite ramais virtuais, gravações de chamadas e integração com softwares de atendimento ao cliente.",
    imagem: imagem11,
    galeria: [imagem11, imagem30, imagem31],
  },
  {
    slug: "energia-solar",
    titulo: "Energia Solar",
    descricao: "Soluções completas em energia fotovoltaica para reduzir sua conta de luz e contribuir para um futuro sustentável.",
    descricaoLonga:
      "A Energia Solar é uma das soluções mais sustentáveis e econômicas para residências e empresas. Desenvolvemos projetos personalizados que contemplam estudo de viabilidade, instalação de painéis fotovoltaicos, inversores e sistemas de monitoramento de geração. Além da economia imediata na conta de luz, a energia solar valoriza o imóvel e contribui para a preservação ambiental.",
    imagem: imagem8,
    galeria: [imagem8, imagem32, imagem33],
  },
];
