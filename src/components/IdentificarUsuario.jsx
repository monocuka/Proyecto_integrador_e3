import React,  { useEffect, useState } from 'react';
import '../assets/css/identificarUsuario.css';
import { useNavigate } from 'react-router-dom';

export const IdentificarUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add this line

  const navigate = useNavigate();

  const btnClick=async (e) =>{
    e.preventDefault();
    fetch('http://localhost:8080/api/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Credenciales incorrectas'); // Change the error message here
      }
      return response.json();
    })
    .then(data => {
      setFetchResponse(data);
      console.log(data);
    })
    .catch(error => {
      console.error('Se produjo un error:', error);
      setErrorMessage(error.message); // Set the error message when an error occurs
    });
  }
  useEffect(() => {
    if (fetchResponse && fetchResponse.token) {
      localStorage.setItem('usuario', JSON.stringify(fetchResponse));
      navigate('/home');
    }
  }, [fetchResponse]);
  
  return (
    <div id="login-component">
      <h2 className='iniciar-sesion'>Iniciar Sesión</h2>
      <form id="login-form">
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        <div id="forgot-password">
          <a href="#">Olvidé contraseña</a>
          <p>{errorMessage}</p> {/* Display the error message here */}
        </div>
        <div className="form-group">
          <button onClick={btnClick} type="submit">Iniciar Sesión</button>
          <button type="button" onClick={cancelLogin}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
