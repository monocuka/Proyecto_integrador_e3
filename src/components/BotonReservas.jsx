import { Link } from 'react-router-dom';
import '../assets/css/BtnReservar.css';

const BotonReservas = ({ product }) => {
    return (
        <Link to={`/detalle/${product.id}`} className="BtnReserva">
            Reservas
        </Link>
    )
};

export default BotonReservas;