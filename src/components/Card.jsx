import '../assets/css/card.css';
import BotonDetalle from "./BotonDetalle";


const Card = ({ product }) => {
    
    if (!product) {
        return null; // O puedes devolver algún componente de carga o un mensaje de error
    }

    // Ruta de la imagen
    const imagePath = product.imagenes[0].urlImagen;

    return (
        <div className="Cards">
            <div className="imagesP">
                <img src={`http://${imagePath}`} alt="imagenproducto" />
            </div>
            <div className="infoCard">
                <h5>{product.nombre}</h5>
                <div className="btnDetalles">
                <BotonDetalle id={product.id} />
                </div>
            </div>
        </div>
    );
};

export default Card;