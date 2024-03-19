import React from 'react';
import '../assets/css/identificarUsuario.css';

const IdentificarUsuario = () => {
  const btnClick=async (e) =>{
    fetch('http://localhost:8080/api/auth/authenticate', {
      method: 'POST', // o 'GET', 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido adecuado si estás enviando datos en formato JSON
        // Puedes incluir otras cabeceras si es necesario
      },
      // Puedes enviar datos en el cuerpo de la solicitud si es necesario
      body: JSON.stringify({
        email: "hjbbkjb",
        password: "iohoib"
    })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al hacer la solicitud');
      }
      return response.json(); // Si esperas una respuesta en formato JSON
    })
    .then(data => {
      // Manipula los datos recibidos aquí
      console.log(data);
    })
    .catch(error => {
      // Maneja cualquier error aquí
      console.error('Se produjo un error:', error);
    });
  }
  
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
          <button onClick={btnClick} type="submit">Iniciar Sesión</button>
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