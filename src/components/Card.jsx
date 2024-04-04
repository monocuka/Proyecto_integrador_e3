import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { isFavorited, removeFavInStorage, setFavInStorage } from './favoritos/favs'; 
import BotonDetalle from './BotonDetalle'; 
import '../assets/css/card.css';

const Card = ({ product, onRemoveFav, onUpdateFavorites }) => { // Recibe onUpdateFavorites como prop
    if (!product) {
        return null;
    }

    const [isFavorite, setIsFavorite] = useState(isFavorited(product.id));

    useEffect(() => {
        setIsFavorite(isFavorited(product.id));
    }, [product.id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavInStorage(product.id)
                .then(() => {
                    setIsFavorite(false);
                    onUpdateFavorites();
                })
                .catch(error => console.error("Error al eliminar de favoritos:", error));
        } else {
            setFavInStorage(product)
                .then(() => {
                    setIsFavorite(true);
                    onUpdateFavorites();
                })
                .catch(error => console.error("Error al agregar a favoritos:", error));
        }
    };
    
    const imagePath = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].urlImagen : null;

    return (
        <div className="Cards">
            <div className="imagesP">
                <img src={imagePath} alt="imagenproducto" />
            </div>
            <div className="infoCard">
                <h5>{product.nombre}</h5>
                <div className="btnDetalles">
                    <FontAwesomeIcon 
                        icon={isFavorite ? solidHeart : regularHeart} 
                        className="favorite-icon" 
                        onClick={toggleFavorite} 
                    />
                    <BotonDetalle product={product} />
                </div>
            </div>
        </div>
    );
};

export default Card;