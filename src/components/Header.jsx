import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/img/logo-sin-fondo-ni letras.png';
import logoMobile from '../assets/img/soloLogoPng.png';
import menuHamburguesa from '../assets/img/burger-menu.svg';
import menuCerrar from '../assets/img/close.svg';

import '../assets/css/header.css';

export const Header = () => {
    const [isBurger, setIsBurger] = useState(true);
    const [isLogoMobile, setLogoMobile] = useState(logoMobile);
    const [colorMenu, setColorMenu] = useState('#F1DFBE');
    const [displayLogo, setDisplayLogo] = useState('block');
    const [displayBurguer, setDisplayBurguer] = useState('none');
    const { authState } = useContext( AuthContext );
    const {logged, usuario} = authState;

    const toggleMenu = () => setIsBurger(!isBurger);

    useEffect(() => {
        const cambiarLogo = () => {
            setLogoMobile(window.innerWidth < 690 ? logoMobile : logo);
            setDisplayBurguer((window.innerWidth < 690) && !logged ? 'block' : 'none');
        }
        window.addEventListener('resize', cambiarLogo);
        return () => window.removeEventListener('resize', cambiarLogo);
    }, []);
    
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
              style={{ display: displayBurguer}}
              />
          <div className="button-header">
            <AuthButtons />
          </div>
          <MobileNavigation isBurger={isBurger} />
        </div>
      </div>
    );
}

const AuthButtons = () => {
    const { authState } = useContext( AuthContext );
    const {logged, usuario} = authState;

    useEffect(() => {
        console.log("Cambio estado de logueo a: " + authState.logged);
    }, [ logged ]);

    return authState.logged ? ( <>
                                    <div className="white-circle">
                                      {usuario?.name[0]}
                                      {usuario?.lastName[0]}
                                    </div>
                                    <div className="dropdown__wrapper hide dropdown__wrapper--fade-in none">
                                        <div className="dropdown__group">
                                            <div className="user-name">Joe Doe</div>
                                            <div className="email">joe.doe@atheros.ai</div>
                                        </div>
                                        <hr className="divider" />
                                        <nav>
                                            <ul>
                                              <li>
                                                <button>Mi Perfil</button>
                                              </li>
                                              <li>
                                                <img src="assets/settings.svg" alt="Settings" /> Settings
                                              </li>
                                            </ul>
                                            <hr className="divider" />
                                            <ul>
                                              <li>
                                                <img src="assets/tutorials.svg" alt="Tutorials" /> Tutorials
                                              </li>
                                              <li>
                                                <img src="assets/help.svg" alt="Help" /> Help Center
                                              </li>
                                            </ul>
                                            <hr className="divider" />
                                            <ul>
                                              <li>
                                                <img src="assets/premium.svg" alt="Premium" />Go Premium
                                              </li>
                                              <li style={{ color: '#E3452F' }}>
                                                <img src="assets/logout.svg" alt="Log Out" />Log out
                                              </li>
                                            </ul>
                                      </nav>
                                    </div>
                                </>
                            ) 
                            : ( <>
                                  <Link to="/iniciarSesion"><button className="button-iniciar">Iniciar sesión</button></Link>
                                  <Link to="/RegistrarUsuario"><button className="button-registrate">Regístrarse</button></Link>
                                </> );
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
