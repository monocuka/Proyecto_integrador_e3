import { useState, useEffect } from 'react';

import '../assets/css/header.css'
import logo from '../assets/img/logo-sin-fondo-ni letras.png';
import menuHamburguesa from '../assets/img/burger-menu.svg';
import menuCerrar from '../assets/img/close.svg';

export const Header = () => {
  const [isBurger, setIsBurger] = useState(true);
//   const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    console.log(isBurger);
    // if (!isBurger) {
    //   setFadeout(true);
    //   const timer = setTimeout(() => {
    //     setFadeout(false);
    //   }, 300);
    //   return () => clearTimeout(timer);
    // }
}, [isBurger]);

  const toggleMenu = () => setIsBurger(!isBurger);

    return(
        <div className="menu__wrapper">
        <div className="menu__bar">
            <div>
                <div className="header-left">    
                    <a href="#" title="Logo" className="logo">
                        <img className="logo-header" src={ logo } alt="logo" />
                    </a>
                    <div className="texto-logo">
                        <h3>Construye sin límites</h3>
                        <h5>alquila con facilidad</h5>
                    </div>
                </div>
            </div>
            <img className="menu-icon" src={ menuHamburguesa } title='Burger Menu' alt='Burger Menu'
                onClick={ toggleMenu } />
            <div className="button-header">
                <button className="button-iniciar">Inciar sesión</button>
                <button className="button-registrate">Regístrarse</button>
            </div>
            <ul className="navigation">
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
//   return (
//     <div className="menu__wrapper">
//         <div className="menu__bar" style={{backgroundColor: isBurger ? '#F1DFBE' : '#342822'}}>
//             <div className="header-left" >    
//                 <a href="#" title="Logo" className="logo">
//                     <div className="caja-logo" style={{display: isBurger ? 'flex' : 'none'}}>
//                         <img className="logo-header" src={ logo } alt="logo" />
//                     </div>
//                 </a>
//                 <div className="texto-logo">
//                     <h3>Construye sin límites</h3>
//                     <h5>alquila con facilidad</h5>
//                 </div>
//             </div>
//             <img className="menu-icon" src={ isBurger ? menuHamburguesa : menuCerrar } title='Burger Menu' alt='Burger Menu' onClick={toggleMenu} />
//             <div className="button-header">
//                 <button className="button-iniciar">Inciar sesión</button>
//                 <button className="button-registrate">Regístrarse</button>
//             </div>
//             <ul className={`navigation ${isBurger ? '' : 'navigation--mobile'} ${fadeout ? 'navigation--mobile--fadeout' : ''}`}>
//                 <h2>Menú</h2>
//                 <li>
//                     <a href="#login" title="sesion">
//                         Iniciar Sesión
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#registry" title="registrarse">
//                         Regístrarse
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     </div>
//   );
}
