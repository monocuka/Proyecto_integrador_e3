import '../assets/css/usuarioDetalle.css';
import '../pages/RegistrarUsuario';

import { useState, useEffect } from 'react';

export const UsuarioDetalle = () => {
    const [usuario, setUsuario] = useState(null);
    
    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        setUsuario(usuarioData);
    }, []);

    if (!usuario) {
        return null; // or some loading state
    }
   

    return (
        <>
            <p className='tituloMiCuenta'>Mi cuenta</p>
            <h2 className='h2usuarioDetalle'>¡Hola {usuario.name} {usuario.lastName}!</h2> 
            <div id='cardUsuDetalle'>
                
                <div>
                    <p>Name: {usuario.name}</p>
                    <p>Last Name: {usuario.lastName}</p> 
                </div>
            </div>
            <BtnCerrarSesion></BtnCerrarSesion>
        </>
    )
}
