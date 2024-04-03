import React,  { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import logoSinFondo from '../assets/img/logo-sin-fondo-ni letras.png';
import iconoPassword from '../assets/img/password.svg';
import iconoEmail from '../assets/img/email.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../assets/css/loginUsuario.css'

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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Acceso correcto",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/home');

      } else {
        
        setUserLogin({ ...userLogin, messageLogin: loginResult.error});
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email o Password  incorrectos.",
          showConfirmButton: false,
          timer: 1500
        });
      
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
    <div className='body-login'>
      <div className="background"></div>
      <div className="centering">
        <form className="my-form" onSubmit={submit}>
          <div className="login-welcome-row">
            <img
              className="login-welcome"
              src={logoSinFondo}
              alt="Astronaut"
            />
            <h1>LogIn!</h1>
          </div>
          <div className="text-field">
            <label htmlFor="email">Email:</label>
            <input
              aria-label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={userLogin.email}
              onChange={onInputChange}
              required
            />
            <img
              alt="Email Icon"
              title="Email Icon"
              src={iconoEmail}
            />
          </div>
          <div className="text-field">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              aria-label="Password"
              name="password"
              placeholder="Tu Password"
              value={userLogin.password}
              onChange={onInputChange}
              required
            />
            <img
              alt="Password Icon"
              title="Password Icon"
              src={iconoPassword}
            />
          </div>
          <input type="submit" className="my-form__button" value="Login" />
          <div className="my-form__actions">
            <div className="my-form__signup">
              <Link to={'/registrarUsuario'} title='Crear una Cuenta'>
                Crear una Cuenta
              </Link>
            </div>
            <div className="my-form__signup">
              <Link to={'/home'} title='Cancelar'>
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}