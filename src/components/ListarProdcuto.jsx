import React, { useState, useEffect } from 'react';
import '../assets/css/listarProducto.css';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import '../assets/css/home.css';

const ListarProducto = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/producto/listar');
        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        
        const jsonData = await res.json();
        setProducts(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
      }
    };
    
    fetchData();
    
  }, []);

  useEffect(() => {
    console.log("Los productos: ", products);
    const imagenUrl = products.length > 0 && products[0].imagenes.length > 0 ? products[0].imagenes[0].urlImagen : null;
  console.log("insdide console log: " + imagenUrl)
  }, [products]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) { 
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container-lista-admin">
  <h3 className="texto-titulo">Listado de Productos</h3>
  <div className='bodyCard cardCentral'>
    <div id='hCard' className="HomeCards">
    {products.map(product => ( 
      <>
        <Card key={product.id} product={product} />
      </>
      
    ))}
    </div>
    
  </div>
  <Link to='/admin' className="btn-atras btn btn-detalle">Volver</Link>
</div>

  );
};

export default ListarProducto;
