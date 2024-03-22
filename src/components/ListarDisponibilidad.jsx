import React, { useState, useEffect } from 'react';
import '../assets/css/listarProducto.css'; // Importa los estilos del componente ListarProducto
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const ListarDisponibilidad = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/producto/disponibilidad');
        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        
        const jsonData = await res.json();
        setProducts(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar la disponibilidad de productos. Por favor, inténtalo de nuevo más tarde.');
      }
    };
    
    fetchData();
    
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) { 
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container-lista-admin">
      <h3 className="texto-titulo">Listado de Disponibilidad de Productos</h3>
      <div className='bodyCard cardCentral'>
        <div id='hCard' className="HomeCards">
          {products.map(product => ( 
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Link to='/admin' className="btn-atras btn btn-detalle">Volver</Link>
    </div>
  );
};

export default ListarDisponibilidad;
