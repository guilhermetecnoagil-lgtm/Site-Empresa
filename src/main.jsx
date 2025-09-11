// Importa StrictMode para checagens extra em desenvolvimento
import { StrictMode } from 'react'

// Cria a raiz de renderização no React 18 (novo API)
import { createRoot } from 'react-dom/client'

// Estilos globais/base do app

import './styles/index.css'


// Componente raiz da aplicação
import App from './App.jsx'

// Localiza o elemento <div id="root"> no HTML e cria a raiz React
createRoot(document.getElementById('root')).render(
  // StrictMode ativa avisos e verificações adicionais no DEV:
  // - monta/desmonta componentes duas vezes em dev para detectar efeitos colaterais
  // - alerta sobre APIs obsoletas
  <StrictMode>
    <App />
   
  </StrictMode>,
)
