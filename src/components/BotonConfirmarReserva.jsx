import { Link } from 'react-router-dom';
import '../assets/css/BtnReservar.css';

const BotonConfirmarReserva = ({ product }) => {
    if (!product || !product.id) {
        return null; // O manejar el caso en que no haya un producto o la propiedad id no esté definida
    }

    return (
        <Link to={`/detalle/${product.id}`} className="BtnReserva">Reservar</Link>
    );
};


export default BotonConfirmarReserva;
