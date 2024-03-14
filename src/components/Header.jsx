import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/header.css'
import logo from '../assets/img/logo-sin-fondo-ni letras.png';
import logoMobile from '../assets/img/soloLogoPng.png';
import menuHamburguesa from '../assets/img/burger-menu.svg';
import menuCerrar from '../assets/img/close.svg';

export const Header = () => {
    const [isBurger, setIsBurger] = useState(true);
    const [isLogoMobile, setLogoMobile] = useState( ' ' );
    const [colorMenu, setColorMenu] = useState( '#F1DFBE' );
    const [displayLogo, setDisplayLogo] = useState( 'block' );
    const [navigationMobile, setNavigationMovile] = useState('');
    
    const toggleMenu = () => setIsBurger(!isBurger);

    const [jwtKey, setJwtKey] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        //const token = localStorage.getItem('jwtKey');
        // const firstName = localStorage.getItem('nombre');
        // const lastName = localStorage.getItem('apellido');
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if(usuario){
            setJwtKey(usuario.token);
            setFirstName(usuario.name);
            setLastName(usuario.lastName);
        }
    }, []);

    useEffect(() => {
        
        const cambiarLogo = () => setLogoMobile(window.innerWidth < 690 ? logoMobile : logo );

        cambiarLogo();
    
        window.addEventListener('load', cambiarLogo);
        window.addEventListener('resize', cambiarLogo);
    
        return () => {
            window.removeEventListener('resize', cambiarLogo);
            window.removeEventListener('load', cambiarLogo);
        };

    }, []); 

    useEffect(() => {
        if ( isBurger ) {
            setColorMenu( '#F1DFBE' );
            setDisplayLogo( 'block' );
            setNavigationMovile('navigation--mobile--fadeout');
        } else {
            setColorMenu( '#342822' );
            setDisplayLogo( 'none' );
            setNavigationMovile('navigation--mobile');
        }
    }, [isBurger]);


    return(
        <div className="menu__wrapper">
        <div className="menu__bar" style={{'backgroundColor': colorMenu}}>
            <div>
                <div className="header-left">    
                    <Link to={'/home'} title="Logo" className="logo">
                        <img className="logo-header" src={ isLogoMobile } style={{'display' : displayLogo}} alt="logo" />
                    </Link>
                    <div className="texto-logo">
                        <h3>Construye sin límites</h3>
                        <h5>alquila con facilidad</h5>
                    </div>
                </div>
            </div>
            <img className="menu-icon" src={ (isBurger) ? menuHamburguesa : menuCerrar } title='Burger Menu' alt='Burger Menu'
                onClick={ toggleMenu } />
            <div className="button-header">
            {jwtKey ? (
                        
                        <div className="white-circle" style={{
                            backgroundColor: 'white', 
                            color: 'black', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            width: '50px',  
                            height: '50px',  
                            borderRadius: '50%',
                            lineHeight: '50px',  
                            textAlign: 'center'
                        }}>
                            {firstName[0]}{lastName[0]}  
                        </div>
                      
                    ) : (
                        <>
                            <Link to="/iniciarSesion">
                                <button className="button-iniciar">Iniciar sesión</button>
                            </Link>
                            <Link to="/RegistrarUsuario">
                                <button className="button-registrate">Regístrarse</button>
                            </Link>
                            
                        </>
                    )}
            </div>
            <ul className={`navigation ${navigationMobile}`}>
                <h2>Menú</h2>
                <li>
                    <a href="#login" title="login">
                        Iniciar sesión
                    </a>
                </li>
                <li>
                    <a href="#registry" title="registry">
                        Registrarse
                    </a>
                </li>
            </ul>
        </div>
    </div>
    );
}
