import '../assets/css/cardDetalle.css'
import { Link } from 'react-router-dom';
import Calendario from './Calendario'; // Asegúrate de proporcionar la ruta correcta al archivo Calendario.jsx




const CardDetalle = ({ product }) => {
    
    if (!product) {
        return null; // O puedes devolver algún componente de carga o un mensaje de error
    }
    // Ruta de la imagen
    const imagePath = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].urlImagen : null;

    const caract = product.caracteristicas;
    const listaCaracteristicas = caract.map((caracteristica, index) => (
        <li key={index}>{caracteristica.nombre}</li>
        ));
    return (
    <div className="CardDetalleF">
            <div className='superiorDtalle'>
                <div className="btnBack">
                    <Link to="/home" className="btnGoback">
                        <img src="/src/assets/img/back.png" alt="atras" className='imgback'/>
                    </Link>
                </div>
                <h2 className='titleDetalle'>Detalle del Producto</h2>
            </div>

            <div className="imagesP">
                <img src={`http://${imagePath}`} alt="imagenproducto" />
            </div>
            <div className='nombrePuntuacion'>
                <h3>{product.nombre}</h3>
                <p>⭐⭐⭐⭐</p>
            </div>
            <div className="infoCardDetail">
            <div className='precio'>
            <p><strong>Precio: $</strong> {product.precio}</p>
            </div>
            <div className='InfoDetalle'>
                <p><strong>Descripción:</strong> {product.descripcion}</p>
                <p><strong>Categoría:</strong> {product.categoria.nombre}</p>
            </div> 
            </div>  
            <div className='Caracteristicas'>
                <h2><strong>Caracteristicas.</strong></h2>
                <div>
                <ul className='listCaracterisitcas'>{listaCaracteristicas}</ul>
                </div>
            </div>
            <div className='CalendarioReserva'>
            <Calendario />
            </div>
            <div className='BtnReserva'>
            /* Aca renderizo el boton para las reservas  */

            </div>
    </div>
    );
};

export default CardDetalle;