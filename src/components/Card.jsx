import React from "react";
import '../assets/css/card.css';


const Card = ({ product }) => {
    // Verificar si product existe antes de acceder a sus propiedades
    if (!product) {
        return null; // O puedes devolver algún componente de carga o un mensaje de error
    }

    return (
        <div className="Cards">
            <h2>{product.nombre}</h2>
            <div className="imagesP">
                    <img src="../src/assets/img/apisonadosHonda.jpeg" alt="apisonador" />
            </div>
            <div className="infoCard">
                <div>
                    <p>Cantidad: {product.cantidad}</p>
                    <p>Precio: ${product.precio}</p>
                </div>
            </div>
            <div className="btnDetalles">
                    <button className="btnDetail">Detalle</button>
            </div>
        </div>
    );
};
export default Card;