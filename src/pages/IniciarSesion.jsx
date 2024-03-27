import React,  { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../assets/css/identificarUsuario.css'

export const IniciarSesion = () => {
  const navigate = useNavigate();
  const { login } = useContext( AuthContext );
  const [userLogin, setUserLogin] = useState({ email : '', password : '', messageLogin: ''});
  
  const submit = async (event) =>{
    event.preventDefault();
    
    try {
      const loginResult = await login(userLogin.email, userLogin.password);
      
      if (loginResult.logged) {
      
        setUserLogin({ ...userLogin, messageLogin: ''});
        navigate('/home');

      } else {
        
        setUserLogin({ ...userLogin, messageLogin: loginResult.error});
      
      }
      
    } catch (error) {
      setUserLogin({ ...userLogin, messageLogin: loginResult.error});
    }
    
  }

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserLogin({
        ...userLogin,
        [ name ]: value
    });
  }

  return (
    <div id="login-component">
      <h2 className='iniciar-sesion'>Iniciar Sesión</h2>
      <form id="login-form" onSubmit={ submit }>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required onChange={ onInputChange } />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required onChange={ onInputChange } />
        </div>
        <div id="forgot-password">
          <a href="#">Olvidé contraseña</a>
          <p>{userLogin.messageLogin}</p>
        </div>
        <div className="form-group">
          <button className='.btnIndetificar' type="submit">Iniciar Sesión</button>
          <Link to="/home">
            <button className='btnIndetificar' type="button">Cancelar</button>
        </Link>
        </div>
      </form>
    </div>
  )
}