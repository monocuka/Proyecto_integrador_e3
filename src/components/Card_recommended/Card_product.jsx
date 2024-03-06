// Card_product.jsx
import React, { useEffect, useState } from 'react';
import Card_recommended from './Card_ recommended';
import '../../assets/css/Card_recommendad.css';

const Card_product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/producto/');
        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const jsonData = await res.json();
        setProducts(jsonData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (products.length === 0) {
    return <div>Cargando...</div>;
  }

  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];

  return (
    <div className='card-product-reco'>
      <Card_recommended product={randomProduct} />
    </div>
  );
};

export default Card_product;
