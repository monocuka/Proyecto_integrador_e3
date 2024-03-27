import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/img/logo-sin-fondo-ni letras.png';
import logoMobile from '../assets/img/soloLogoPng.png';
import menuHamburguesa from '../assets/img/burger-menu.svg';
import menuCerrar from '../assets/img/close.svg';

import '../assets/css/header.css'

library.add(fas);

export const Header = () => {
    const [ isBurger, setIsBurger ] = useState(true);
    const [ isLogoMobile, setLogoMobile ] = useState(logoMobile);
    const [ colorMenu, setColorMenu ] = useState('#F1DFBE');
    const [ displayLogo, setDisplayLogo ] = useState('block');
    const [ displayBurguer, setDisplayBurguer ] = useState(false);
    const { authState } = useContext( AuthContext );
    const { logged } = authState;

    const toggleMenu = () => setIsBurger(!isBurger);
    
    const logicaDisplayMenuBurguer = (resolucion, logged) => {
      return resolucion < 690 && !logged
    }

    useEffect(() => {
        const cambiarLogo = () => {
            setLogoMobile(window.innerWidth < 690 ? logoMobile : logo);
            setDisplayBurguer(logicaDisplayMenuBurguer(window.innerWidth, logged));
        }
        cambiarLogo();
        window.addEventListener('resize', cambiarLogo);
        return () => window.removeEventListener('resize', cambiarLogo);
    }, [logged]);
    
    useEffect(() => {
      setColorMenu(isBurger ? '#F1DFBE' : '#342822');
      setDisplayLogo(isBurger ? 'block' : 'none');
    }, [isBurger]);

    return (
      <div className="menu__wrapper">
        <div className="menu__bar" style={{ backgroundColor: colorMenu }}>
          <div className="header-left">
            <Link to={'/home'} title="Logo" className="logo">
              <img className="logo-header" src={isLogoMobile} style={{ display: displayLogo }} alt="logo" />
            </Link>
            <div className="texto-logo">
              <h3>Construye sin límites</h3>
              <h5>alquila con facilidad</h5>
            </div>
          </div>
          <img className="menu-icon" 
              src={isBurger ? menuHamburguesa : menuCerrar} 
              title='Burger Menu' 
              alt='Burger Menu'
              onClick={toggleMenu} 
              style={{ display: displayBurguer ? 'block' : 'none'}}
              />
            <AuthButtons displayMenuBurguer = { displayBurguer }/>
          <MobileNavigation isBurger={isBurger} />
        </div>
      </div>
    );
}

const AuthButtons = ({ displayMenuBurguer }) => {
    const profileRef = useRef(null);
    const dropdownRef = useRef(null);
    const { authState, logout } = useContext( AuthContext );
    const {logged, usuario} = authState;
    const navigate = useNavigate(); // Obtén la función navigate para redireccionar


  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = dropdownRef.current;
      const profile = profileRef.current;

      if (dropdown && profile) {
        const isClickInsideDropdown = dropdown.contains(event.target);
        const isProfileClicked = profile.contains(event.target);

        if (!isClickInsideDropdown && !isProfileClicked) {
          dropdown.classList.add('hide');
          dropdown.classList.add('dropdown__wrapper--fade-in');
        }
      }
    };

    const handleProfileClick = () => {
        const dropdown = dropdownRef.current;
        if (dropdown) {
          dropdown.classList.remove('none');
          dropdown.classList.toggle('hide');
        }
    };

    const profile = profileRef.current;
    const dropdown = dropdownRef.current;

    if (profile && dropdown) {
        profile.addEventListener('click', handleProfileClick);
        document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (profile && dropdown) {
        profile.removeEventListener('click', handleProfileClick);
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [logged]);

  const handleLogout = () => {
      logout();
      navigate('/home');
  };
    return (
      <div className="button-header" style={{ display: !displayMenuBurguer ? 'block' : 'none'}}>
          {logged ? (
              <div className='login-name'>
                <div className='info-user-header'>
                  <p>{usuario?.name} {usuario?.lastName}</p>
                  <p className='role-header'>{usuario?.roles[0].nombreRol.split('_')[1].toLowerCase()}</p>
                </div>
                  <div className="white-circle" ref={profileRef}>
                      {usuario?.name[0]}
                      {usuario?.lastName[0]}
                  </div>
                  <div className="dropdown__wrapper hide dropdown__wrapper--fade-in none" ref={dropdownRef}>
                      <div className="dropdown__group">
                          <div className="user-name">{usuario?.name} {usuario?.lastName}</div>
                          <div className="email">{usuario?.email}</div>
                      </div>
                      <hr className="divider" />
                      <nav>
                        <ul>
                          <li>
                            <Link to={'/home'} >
                              <FontAwesomeIcon icon="fa-solid fa-house" />
                              Home
                            </Link>
                          </li>
                        </ul>
                        {(usuario?.roles[0]?.nombreRol === "ROLE_ADMIN") ? (
                                    <>
                                      <hr className="divider" />
                                      <ul>
                                          <li>
                                            <Link to={'/agregarProducto'} >
                                              <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="lg"/>
                                              Agregar Producto
                                            </Link>
                                          </li>
                                          <li>
                                            <Link to={'/editarProducto'} >
                                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size='lg'/>
                                              Editar Producto
                                            </Link>
                                          </li>
                                      </ul>
                                      <hr className="divider" />
                                      <ul>
                                          <li>
                                            <Link to={'/agregarCategoria'} >
                                              <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="lg"/>
                                              Agregar Categoria
                                            </Link>
                                          </li>
                                      </ul> 
                                    </>) : (null) }
                          <hr className="divider" />
                          <ul>
                              <li style={{ color: '#720000' }} onClick={handleLogout}>
                                  <FontAwesomeIcon icon="fas fa-sign-in-alt" size="lg" style={{ color: "#720000" }} />
                                  Log out
                              </li>
                          </ul>
                      </nav>
                  </div>
              </div>
          ) : (
              <>
                  <Link to="/iniciarSesion"><button className="button-iniciar">Iniciar sesión</button></Link>
                  <Link to="/RegistrarUsuario"><button className="button-registrate">Regístrarse</button></Link>
              </>
          )}
      </div>
  ); 
                                
}

    const MobileNavigation = ({ isBurger }) => {
    const [navigationMobile, setNavigationMobile] = useState('navigation--mobile--fadeout');

    useEffect(() => {
      setNavigationMobile(isBurger ? 'navigation--mobile--fadeout' : 'navigation--mobile');
    }, [isBurger]);

    return (
      <ul className={`navigation ${navigationMobile}`}>
        <h2>Menú</h2>
        <li><a href="#login" title="login">Iniciar sesión</a></li>
        <li><a href="#registry" title="registry">Registrarse</a></li>
        
      </ul>
    );
}