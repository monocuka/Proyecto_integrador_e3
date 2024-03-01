import React from "react";
import '../assets/css/card.css';
import { Link } from "react-router-dom";

const Card = ({ product }) => {
    return (
        <div className="Cards">
            <div className="product1">
                <h2>{product.nombre}</h2>
                <p>Cantidad: {product.cantidad}</p>
                <p>Precio: ${product.precio}</p>

                {product.imagenes && product.imagenes.length > 0 && (
                    <div>
                        <p>Imágenes:</p>
                        <ul>
                            {product.imagenes.map((imagen, index) => (
                                <li key={index}>
                                    <img src={imagen} alt={`Imagen ${index + 1}`} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link to={`/Detalle/${product.id}`}>
                    <button>Detalle</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;