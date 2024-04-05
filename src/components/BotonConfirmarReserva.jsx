import { Link } from 'react-router-dom';
import '../assets/css/BtnReservar.css';
import Swal from 'sweetalert2'


const BotonConfirmarReserva = ({ product }) => {
    
    //http://localhost:8080/api/reserva/guardar


    return (
        <div id='btnReservaOk'>
        <Link to={`/detalle/${product.id}`} className="BtnReserva">Reservar</Link>
        </div>
    );
};


export default BotonConfirmarReserva;
