import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../pages/RegistrarUsuario';
import '../assets/css/reservaDetalle.css';
import { AuthContext } from '../context/AuthContext';
import BotonConfirmarReserva from '../components/BotonConfirmarReserva';
import DetalleReserva from '../components/DetalleReserva';
import Swal from 'sweetalert2'

export const ReservaDetalle = () => {

    const { authState } = useContext(AuthContext);
    const { usuario } = authState;

    const { id } = useParams(); // Obtén el id de la URL
    const { startDate } = useParams(); // Obtén el id de la URL
    const { endDate } = useParams(); // Obtén el id de la URL
    const [product, setProduct] = useState(null);
    
    const formatDateToArray = (dateString) => {
      const [year, month, day] = dateString.split('-').map(Number);
      return [year, month, day];
    };

    const [reservaData, setReservaData] = useState({
        fechaDesde: [],
        fechaHasta: [],
        cantidad: 1,
        idProducto: id,
        emailUsuario: usuario.email
    });

    useEffect(() =>{
        setReservaData({
            fechaDesde: formatDateToArray(startDate),
            fechaHasta: formatDateToArray(endDate),
            cantidad: 1,
            idProducto: id,
            emailUsuario: usuario.email
        });
    }, []);

    const enviarReserva = async () => {
          fetch('http://localhost:8080/api/reserva/guardar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservaData),
          }).then((response) => response.text())
          .then((result) => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Reserva exitosa",
                showConfirmButton: false,
                timer: 1500
              });
          })
          .catch((error) => console.error(error));
    };

    useEffect(() => {
        const obtenerDetallesProductoPorId = async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/producto/id/${id}`);
                const data = await response.json();
                return data; 
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                throw error; // Lanza el error para que puedas manejarlo en el componente
            }
        };

        const obtenerDetallesProducto = async () => {
            try {
                const detalles = await obtenerDetallesProductoPorId(id);
                setProduct(detalles);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
            }
        };
        obtenerDetallesProducto();
    }, []);

    if (!product) {
        return <div>Cargando...</div>;
    }


    return (
        <div>
            <div >
                <UsuarioRegistrado />
            </div>
            <div className="imagesDetail">
                <div id='dCard' className="DetailCard">
                    <DetalleReserva product={product} />
                </div>
            </div>
            <div className='divFechasSeleccionadas'>
                <div>
                    <div>Fecha inicio de reserva: {startDate} </div>
                    <div>Fecha fin de reserva: {endDate} </div>
                </div>
            </div>
            <div className='botonConfirmarReserva'>
                <button onClick={enviarReserva}>
                    Guardar Reserva
                </button>
            </div>

        </div>
    );
}

const UsuarioRegistrado = () => {
    const { authState } = useContext(AuthContext);
    const { usuario } = authState;

    return (
        <>
            <div id='infoUsuario'>
                <p id='tituloMiCuentaReserva'>Mi reserva</p>
                <div id='cardUsuDetalleReservaDet'>

                    <div>
                        <p>Nombre: {usuario.name}</p>
                        <p>Apellido: {usuario.lastName}</p>
                        <p>email: {usuario.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
};