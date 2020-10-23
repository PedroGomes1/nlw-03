import React, { FormEvent, useCallback, useState } from 'react';
import '../styles/pages/forgot-password.css';
import logo from '../images/logotipo-maior.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';


export default function ForgotPassword() {
  const history = useHistory();

  const [email, setEmail] = useState('');

  const handleForgotPassword = useCallback(async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      
      await api.post('/forgot-password', {
        email
      })

      history.push('/');

      alert('Um novo e-mail para redefinição de senha foi enviado para você!')
    } catch (error) {
      alert('Erro ao redefinir senha')
    }
  },[email, history])

  return (
    <div id="page-forgot">

      <div className="background">
        <img src={logo} alt="logo" />

        <strong>Aguaí</strong>
        <span>São Paulo</span>
      </div>

      <div className="form-area">
      
         <Link to="/login" className="back-button">
          <FiArrowLeft size={24} color="#15C3D6"/>
         </Link>

        <h1>Esqueci a senha</h1>

        <span>Sua redefinição de senha será enviada para o e-mail cadastrado.</span>

        <form onSubmit={handleForgotPassword}>
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            style={{
              cursor: email? 'pointer' : 'not-allowed',
              pointerEvents: email? 'auto' : 'none',
              opacity: email? 1 : 0.4
            }}
          >
            Entrar  
          </button>        
        </form>

      </div>

    </div>
  )
}