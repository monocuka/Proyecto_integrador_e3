import '../assets/css/card.css';
import '../assets/css/cardDetalle.css'
import { Link } from 'react-router-dom';


const CardDetalle = ({ product }) => {
    
    if (!product) {
        return null; // O puedes devolver algún componente de carga o un mensaje de error
    }
    console.log("Dentro de la card el producto es: ", product);
    //console.log("el path de la imagen dentro del card: " + product.imagenes[0].urlImagen);
    // Ruta de la imagen
    const imagePath = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].urlImagen : null;

    return (
        <div className="CardDetalleF">
            <div className="imagesP">
                <img src={`http://${imagePath}`} alt="imagenproducto" />
            </div>
            <div className="infoCardDetail">
                    <h5>{product.nombre}</h5>
                    {/* <p><strong>Código:</strong> {product.codigo}</p> */}
                    <p><strong>Descripción:</strong> {product.descripcion}</p>
                    <p><strong>Precio:</strong> {product.precio}</p>
                    <p><strong>Categoría:</strong> {product.categoria.nombre}</p>
                    <div className="btnBack">
                        <Link to="/home" className="btnGoback">🔙</Link>
                    </div>
                </div>
        </div>
    );
};

export default CardDetalle;