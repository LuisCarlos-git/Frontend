import React, { useState } from 'react';
import './App.css';

import logo from './assets/logo.svg'
import api from './services/api'

function App() {
  const [ email, setEmail ] = useState('');//armazena o email

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/session', {email});
    const{ _id } = response.data.user;

    localStorage.setItem('user', _id)
  }

  return (
    <div className="container">
      <img src={logo} />     

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa 
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail *</label>

          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu e-mail..." 
            className="input"
            value={email}
            onChange={event =>setEmail(event.target.value)}
          />


          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
