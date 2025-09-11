// Importa apenas os módulos necessários do SDK v9 (modular)
// initializeApp: inicia o app Firebase
import { initializeApp } from "firebase/app";
// getAnalytics: coleta de métricas (apenas em produção/navegador com permissões/cookies)
import { getAnalytics } from "firebase/analytics";
// Firestore (banco NoSQL)
import { getFirestore } from "firebase/firestore";
// Auth (autenticação de usuários)
import { getAuth } from "firebase/auth";
// Storage (arquivos/imagens)
import { getStorage } from "firebase/storage";

// Configurações do seu projeto Firebase.
// OBS: Em apps Web, essas chaves **não são segredos** (são IDs de projeto), 
// mas ainda assim evite comitar configs de ambientes não públicos e 
// use regras de segurança do Firebase corretamente.
const firebaseConfig = {
  apiKey: "AIzaSyCEtelFYZUNbnB6e4-1LJquxxRZs32xlR4",            // Chave de API do projeto (identificação do app)
  authDomain: "tecsite-2772d.firebaseapp.com",                   // Domínio de autenticação
  projectId: "tecsite-2772d",                                    // ID do projeto no Firebase/Google Cloud
  storageBucket: "tecsite-2772d.firebasestorage.app",            // Bucket do Storage
  messagingSenderId: "758169055811",                             // Sender ID (Cloud Messaging)
  appId: "1:758169055811:web:6cd13d730358e2d2badaf6",            // App ID (identificação do app)
  measurementId: "G-P2M5SY57GM"                                  // ID do Google Analytics (opcional)
};

// Inicializa o app Firebase com a config acima
const app = initializeApp(firebaseConfig);

// Inicializa Analytics para coleta de eventos (só funciona em produção/HTTPS e navegador)
// Em ambientes SSR (Next.js) ou Node, proteja com checagem de window.
const analytics = getAnalytics(app);

// Instâncias dos serviços que você usará no app
export const db = getFirestore(app);   // Firestore: leitura/gravação no banco
export const auth = getAuth(app);      // Auth: login/logout/estado do usuário
export const storage = getStorage(app);// Storage: upload/download de arquivos
