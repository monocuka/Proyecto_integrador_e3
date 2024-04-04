import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardDetalle from '../components/CardDetalle';
import '../pages/RegistrarUsuario';
import '../assets/css/reservaDetalle.css';
import { AuthContext } from '../context/AuthContext';
import BotonConfirmarReserva from '../components/BotonConfirmarReserva';
import DetalleReserva from '../components/DetalleReserva';

//import { useData } from '../context/DataContext';
 // Importing the DataContext


export const ReservaDetalle = () => {

    const { id } = useParams(); // Obtén el id de la URL
    const { startDate } = useParams(); // Obtén el id de la URL
    const { endDate } = useParams(); // Obtén el id de la URL
    const [product, setProduct] = useState(null);

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
              {/*  <BotonConfirmarReserva product={product} />*/}
              <Link to={`/detalle/${product.id}`} className="BtnReserva">Reservar</Link>

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


