import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CardDetalle from '../components/CardDetalle';
import '../pages/RegistrarUsuario';
import '../assets/css/reservaDetalle.css';
import { AuthContext } from '../context/AuthContext';
import BotonConfirmarReserva from '../components/BotonConfirmarReserva';
//import { useData } from '../context/DataContext';
 // Importing the DataContext


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
                    <CardDetalle product={product} />
                </div>
            </div>
            <div className='divFechasSeleccionadas'>
                <div>
                    <div>Fecha inicio de reserva: </div>
                    <div>Fecha fin de reserva:  </div>
                </div>
            </div>
            <div className='botonConfirmarReserva'>
                <BotonConfirmarReserva product={product} />
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

/*const FechasSeleccionadas = ({ product }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    /*useEffect(() => {
    
        const res = await fetch(`http://localhost:8080/api/producto/disponibilidad/fechainicial/${startDate}/fechafinal/${endDate}?busqueda=${nombreBusqueda}`)
                .then(response => response.json())
                .then(data => {
                    setReserva(data);
                    console.log(JSON.stringify(data, null, 2));
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        fetchData();
 }, []);

    return (
        <>
            <div className='fechasSeleccionadas'>
                <div>Fecha inicio de reserva: {startDate} </div>
                <div>Fecha fin de reserva: {endDate} </div>
            </div>
        </>
    )
};*/



/*const FechaDesdeCalendar = () => {
  const { data } = useData(); // Using the useData hook to access context data

  return (
    <div>
      <h2>Child Component</h2>
      <p>Data: {data}</p>
      <div className='fechasSeleccionadas'>
                <div>Fecha inicio de reserva: {data.startDate} </div>
                <div>Fecha fin de reserva: {data.endDate} </div>
            </div>
    </div>
  );
};*/

