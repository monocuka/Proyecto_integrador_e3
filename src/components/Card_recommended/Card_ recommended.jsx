// Card_recommended.jsx
import React from 'react';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import './../../assets/css/Card_recommendad.css';


const Card_recommended = ({ product }) => {
  const { nombre, descripcion, precio, id } = product;

  const imagenUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].urlImagen : null;

  return (
    <section className="container-card">
      <div className="card-product">
        {imagenUrl && (
          <img src={`http://${imagenUrl}`} alt={nombre} className="img-card-recommended" />
        )}
        <div className="description-product">
          <h3 className="tittle">{nombre}</h3>
          <p className="description">{descripcion}</p>
          <div className="score">
            <p className="score-num">({product.rentalCount})</p>
            <StarRating rating={product.rating}/>
          </div>
          <div className="valor">
            <p className="num-precio">${precio}</p>
            <p className="hrs">Valor por día</p>
          </div>
          <Link to={`/detalle/${id}`} className="btn-buscar btn-detail">Ver detalle</Link>
        </div>
      </div>
    </section>
  );
}

export default Card_recommended;
