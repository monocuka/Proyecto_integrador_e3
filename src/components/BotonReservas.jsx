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
    const [url, setUrl] = useState("") 

    useEffect(() => {
        if (logged) {
            // Si el usuario está autenticado, redirigir al componente de reservas
            setRedirectTo(`/reservas/${product.id}/${startDate}/${endDate}`);
        } else {
            // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
            setRedirectTo('/iniciarSesion');
        }
        console.log(startDate, endDate);
    }, [logged]);

    const handleReservarClick = () => {
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
        <Link to={logged ? redirectTo : '#'} onClick={handleReservarClick}>
            <button className="button-iniciar">Detalle Reserva</button>
        </Link>
    );
};

export default BotonReservas;