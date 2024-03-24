import '../assets/css/card.css';
import BotonDetalle from "./BotonDetalle";


const Card = ({ product }) => {
    
    if (!product) {
        return null; // O puedes devolver algún componente de carga o un mensaje de error
    }
    //console.log("Dentro de la card el producto es: ", product);
    //console.log("el path de la imagen dentro del card: " + product.imagenes[0].urlImagen);
    // Ruta de la imagen
    const imagePath = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].urlImagen : null;

    return (
        <div className="Cards">
            <div className="imagesP">
                <img src={`http://${imagePath}`} alt="imagenproducto" />
            </div>
            <div className="infoCard">
                <h5>{product.nombre}</h5>
                <div className="btnDetalles">
                <BotonDetalle  product={product} />
                </div>
            </div>
        </div>
    );
};

export default Card;