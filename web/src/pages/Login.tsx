import React, { FormEvent, useCallback, useState } from 'react';
import '../styles/pages/login.css';
import logo from '../images/logotipo-maior.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../hooks/auth';


export default function Login() {

  const history = useHistory();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemeber] = useState(false); 

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      await signIn({ email, password });
      history.push('/dashboard');
    } catch (error) {
      alert('Erro ao fazer login')
    }
  }

  return (
    <div id="page-container">

      <div className="background">
        <img src={logo} alt="logo" />

        <strong>Aguaí</strong>
        <span>São Paulo</span>
      </div>

      <div className="login-area">
        
         <Link to="/" className="back-button">
          <FiArrowLeft size={24} color="#15C3D6"/>
         </Link>

        <h1>Fazer login</h1>

        <form onSubmit={handleLogin}>
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options-form">
            <input type="checkbox"
              name="remember"
              id="remember"
              onChange={(e) => setRemeber(e.target.checked)}
            />
            <label htmlFor="remember">Lembrar-me</label>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </div>

          <button 
            type="submit"
            style={{
              cursor: email && password ? 'pointer' : 'not-allowed',
              pointerEvents: email && password ? 'auto' : 'none',
              opacity: email && password ? 1 : 0.4
            }}
          >
            Entrar  
          </button>        
        </form>
      </div>
    </div>
  )
}