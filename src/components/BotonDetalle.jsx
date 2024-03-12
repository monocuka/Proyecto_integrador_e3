import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/btnDetails.css';


const BotonDetalle = ({ id }) => {
    return (
        <Link to={`/detalle/${id}`} className="btnDetail">
            Detalle
        </Link>
    )
};

export default BotonDetalle;