import React, { useState } from 'react';
import Card from '../Card';
import { getFavFromStorage, removeFavInStorage } from '../favoritos/favs';
import '../../assets/css/card.css' 
import '../../assets/css/favoritos.css'
import '../../assets/css/home.css' // style - class -> HomeCards
import { Link } from 'react-router-dom';

const Favoritos = () => {
    const [localFavs, setLocalFavs] = useState(getFavFromStorage());

    // Función para actualizar el listado de favoritos
    const updateFavoriteProducts = () => {
        setLocalFavs(getFavFromStorage());
    };

    // Función para manejar la eliminación de favoritos
    const handleRemoveFav = (id) => {
        removeFavInStorage(id);
        updateFavoriteProducts(); 
    };

    return (
        <div id='bodyCard' className='bodyFavoritos'>
            <h2 className='titulo-favoritos'>Mis productos favoritos</h2>
            <div className="card-grid HomeCards margenInferior-fav" id='hCard'>
                {localFavs.map((fav) => (
                    <Card
                        key={fav.id}
                        product={fav}
                        onRemoveFav={() => handleRemoveFav(fav.id)}
                        onUpdateFavorites={updateFavoriteProducts}
                    />
                ))}
            </div>
            <Link to='/home' className="btn-atras btn btn-detalle">Volver</Link>
        </div>
    );
};

export default Favoritos;

