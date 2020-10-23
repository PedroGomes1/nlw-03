import React, { FormEvent, useCallback, useState } from 'react';
import '../styles/pages/reset-password.css'; 
import logo from '../images/logotipo-maior.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../services/api';


export default function ResetPassword() {

  const location = useLocation();
  const history = useHistory();

  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordRepeat, setViewPasswordRepeat] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleChangeViewPassword = useCallback(() => {
    setViewPassword(!viewPassword)
  },[viewPassword]);

  const handleChangeViewPasswordRepeat = useCallback(() => {
    setViewPasswordRepeat(!viewPasswordRepeat)
  },[viewPasswordRepeat])

  const handleResetPassword = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const token = location.search.replace('?token=', '');

    try {
      await api.post('/reset-password', {
        token,
        password
      })

      alert('Sua senha foi redefinida com sucesso!');

      history.push('/login')
    } catch (error) {
      alert('Erro ao tentar redefinir sua senha!')
    }
  },[location.search, history, password])

  return (
    <div id="page-reset">

      <div className="background">
        <img src={logo} alt="logo" />

        <strong>Aguaí</strong>
        <span>São Paulo</span>
      </div>

      <div className="form-area">

        <h1>Redefinição de senha</h1>

        <span>Escolha uma nova senha para você acessar o dashboard do Happy.</span>

        <form onSubmit={handleResetPassword}>
          <div className="input-block">
            <label htmlFor="password">Nova senha</label>
            <div className="input-icon">
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {viewPassword ? (
                <FiEye size={20} color="#8FA7B3" onClick={handleChangeViewPassword}/>
              ) : (
                <FiEyeOff size={20} color="#8FA7B3" onClick={handleChangeViewPassword}/>
              )}
              </div>
          </div>

          <div className="input-block">
            <label htmlFor="password-confirmation">Repetir senha</label>

            <div className="input-icon">
              <input
                type={viewPasswordRepeat ? "text" : "password"}
                id="password-confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              {viewPasswordRepeat ? (
                <FiEye size={20} color="#8FA7B3" onClick={handleChangeViewPasswordRepeat} />
              ) : (
                <FiEyeOff size={20} color="#8FA7B3" onClick={handleChangeViewPasswordRepeat} />
              )}
              
            </div>
          </div>

          <button 
            type="submit"
            style={{
              cursor: password && passwordConfirmation? 'pointer' : 'not-allowed',
              pointerEvents: password && passwordConfirmation?  'auto' : 'none',
              opacity: password && passwordConfirmation?  1 : 0.4
            }}
          >
            Entrar  
          </button>        
        </form>

      </div>

    </div>
  )
}