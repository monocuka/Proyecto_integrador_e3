
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/detalle.css'

const Detalle = ({ product }) => {

        if (!product) {
            return null; // O puedes devolver algún componente de carga o un mensaje de error
        }
    
        // Ruta de la imagen
        const settings = {
            dots: true,
            infinite:true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
    
        return (
            <div className="CardsDetails">
                <div className="imagesDetail">
                    <Slider {...settings}>
                            {/* Aquí puedes mapear las imágenes del producto */}
                        {product.imagenes.map((imagen, id) => (
                            <div key={id}>
                                <img src={imagen} alt={`imagen-${id}`} />
                            </div>
                        ))}
                    </Slider>
    
                </div>
                <div className="infoCardDetail">
                <h5>{product.nombre}</h5>
                <p><strong>Código:</strong> {product.codigo}</p>
                <p><strong>Descripción:</strong> {product.descripcion}</p>
                <p><strong>Precio:</strong> {product.precio}</p>
                <p><strong>Categoría:</strong> {product.categoria}</p>
                    <div className="btnBack">
                        <button className="btnGoback">🔙</button>
                    </div>
                </div>
            </div>
        );
    };

export default Detalle;