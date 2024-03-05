import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import './../../assets/css/Card_recommendad.css';

const Card_recommended = ({ imagen, description, name, precio, rating, rentalCount }) => {
  
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = 'http://localhost:8080/';

    fetch(`${backendUrl}/${name}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
        <section className="container-card">
          <div className="card-product">
            <img src={imagen} alt={name} className="img-card-recommended" />
            <div className="description-product">
                <h3 className="tittle">{name}</h3>
                <p className="description">{description}</p>
                <div className="score">
                  <p className="score-num">({rentalCount})</p>
                  <StarRating rating={rating}/>
                </div>
                <div className="valor">
                  <p className="num-precio">${precio}</p>
                  <p className="hrs">Valor por día</p>
                </div>
                <Link to={`/detalle/${name}`} className="btn-buscar btn-detail">Ver detalle</Link>
            </div>
          </div>
        </section>
    </>
  )
}

export default Card_recommended;
