import { Link } from 'react-router-dom';
import '../assets/css/btnDetails.css';

const BotonEditar = ({ product }) => {
    return (
        <Link to={`/detalle/${product.id}`} className="btnDetail">
            Editar
        </Link>
    )
};

export default BotonEditar;