import { useState, useEffect } from 'react';

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
                    <a href="#" title="Logo" className="logo">
                        <img className="logo-header" src={ isLogoMobile } style={{'display' : displayLogo}} alt="logo" />
                    </a>
                    <div className="texto-logo">
                        <h3>Construye sin límites</h3>
                        <h5>alquila con facilidad</h5>
                    </div>
                </div>
            </div>
            <img className="menu-icon" src={ (isBurger) ? menuHamburguesa : menuCerrar } title='Burger Menu' alt='Burger Menu'
                onClick={ toggleMenu } />
            <div className="button-header">
                <button className="button-iniciar">Inciar sesión</button>
                <button className="button-registrate">Regístrarse</button>
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
