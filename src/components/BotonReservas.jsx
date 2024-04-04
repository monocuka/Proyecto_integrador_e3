import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import '../assets/css/BtnReservar.css';

const BotonReservas = ({ product, startDate, endDate }) => {
    const { authState } = useContext(AuthContext);
    const { logged } = authState;
    const [redirectTo, setRedirectTo] = useState('/iniciarSesion');
    
    useEffect(() => {
        if (logged) {
            if (mayor47hs() ==  true) {
                setRedirectTo('/reservas');
            }
            
        } else {
            // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
            setRedirectTo('/iniciarSesion');
        }
    }, [logged]);
    const mayor47hs = () => {
        if(!endDate && !startDate){
            return false;
        }
        const differenceInHours = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60);
        return differenceInHours > 48;
    };
    
    const handleReservarClick = () => {
        
        if(mayor47hs() == false){
            return null;
        }
        if (!logged) {
            // Si el usuario no está autenticado, mostrar el mensaje con SweetAlert2
            Swal.fire({
                title: 'Inicia sesión para reservar el producto',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Redirigir al componente de inicio de sesión cuando se hace clic en OK
                if (result.isConfirmed) {
                    window.location.href = redirectTo;
                }
            });
        }
    };

    if (!product || !product.id) {
        return null; // Si no hay un producto válido, no mostrar el botón
    }

    return (
        <>
            <div>
                <p style={{visibility: mayor47hs() ? 'hidden' : 'visible', color: 'red'}}>Tiene que haber minimo 48hs entre las fechas</p>
                <p>Las fechas no se encuentran disponibles</p>
            </div>
                
            <Link to={logged ? redirectTo : '#'} onClick={handleReservarClick}>
                <p>Reservar</p>
                {/* <button className="button-iniciar" >Reservar</button> */}
            </Link>
        </>
        
    );
};

export default BotonReservas;
