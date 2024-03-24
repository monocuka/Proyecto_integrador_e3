import { Link } from 'react-router-dom';
import '../assets/css/btnDetails.css';


const BotonDetalle = ({ product }) => {
    return (
        <Link to={`/detalle/${product.id}`} className="btnDetail">
            Detalle
        </Link>
    )
};

export default BotonDetalle;