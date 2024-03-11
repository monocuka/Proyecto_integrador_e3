import React from 'react';
import '../assets/css/identificarUsuario.css';

function IdentificarUsuario() {
  return (
    <div id="login-component">
      <h2 className='iniciar-sesion'>Iniciar Sesión</h2>
      <form id="login-form">
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div id="forgot-password">
        <a href="#">Olvidé contraseña</a>
      </div>
        <div className="form-group">
          <button type="submit">Iniciar Sesión</button>
          <button type="button" onClick={cancelLogin}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

function cancelLogin() {
  // Función para cancelar el inicio de sesión
  // lógica necesaria aquí
}

export default IdentificarUsuario;