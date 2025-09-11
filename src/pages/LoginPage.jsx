// React e hooks
import React, { useState } from 'react';

// Firebase Auth: função para login com email/senha
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

// Estilos da página
import '../styles/LoginPage.css';

// Hook de navegação do React Router
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // Estados controlados dos campos do formulário
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  // Mensagem de erro para feedback ao usuário
  const [erro, setErro]     = useState('');
  // Flag de carregamento para desabilitar UI enquanto autentica
  const [loading, setLoading] = useState(false);

  // Instância do hook de navegação
  const navigate = useNavigate();

  // Handler do submit do formulário
  const handleLogin = async (e) => {
    e.preventDefault();   // evita recarregar a página
    setErro('');
    setLoading(true);

    try {
      // Tenta autenticar com Firebase
      await signInWithEmailAndPassword(auth, email, senha);
      // Sucesso: redireciona para a Home
      navigate('/');
    } catch (err) {
      // Falha: mostra erro genérico (evita revelar detalhes)
      setErro('Email ou senha inválidos.');
    } finally {
      // Sempre encerra o estado de carregamento
      setLoading(false);
    }
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Portal do Cliente</h2>

        {/* Formulário controlado */}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {/* Link de recuperação de senha (a implementar) */}
          <a href="#">Esqueceu sua senha?</a>

          {/* Botão com loading state */}
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Mensagem de erro, quando existir */}
          {erro && <p className="login-error">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
