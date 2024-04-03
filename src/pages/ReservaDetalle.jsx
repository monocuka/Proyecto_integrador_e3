import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetalle from '../components/CardDetalle';
import '../pages/RegistrarUsuario';
import '../assets/css/reservaDetalle.css';
import Detalle from './Detalle';

export const ReservaDetalle = () => {

    const { id } = useParams(); // Obtén el id de la URL
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
    }, [id]);

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
                    <CardDetalle product={product} />
                </div>
            </div>
            
        </div>
    );
}

const UsuarioRegistrado = () => {
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
            <div id='infoUsuario'>
                <p id='tituloMiCuentaReserva'>Mi reserva</p>
                <div id='cardUsuDetalleReservaDet'>

                    <div>
                        <p>Name: {usuario.name}</p>
                        <p>Last Name: {usuario.lastName}</p>
                        <p>email: {usuario.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

/*const FechasSeleccionadas = ({ }) => {
    //const [data, setData] = useState(null);

    return (
        <>
            <div className='fechasSeleccionadas'>
                <div>Fecha inicio de reserva: {data} </div>
                <div>Fecha fin de reserva: {data} </div>
            </div>
        </>
    )
};
export default FechasSeleccionadas;*/
