import React from 'react';
import logoImg from '../images/logo.svg';
import '../styles/pages/landing.css'
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">

        <div className="header-content">

          <div className="image-location">
            <img src={logoImg} alt="logo"/>

            <div className="location">
              <strong>Aguaí</strong>
              <span>São Paulo</span>
            </div>
          </div>
          
          <Link to="/login">
            <button>Acesso restrito</button>
          </Link>

        </div>
        
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>


        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
        </Link>
      </div>
  </div>
  )
}

export default Landing;