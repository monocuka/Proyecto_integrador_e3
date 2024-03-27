import React, { useState, useEffect } from 'react';
import '../assets/css/listarProducto.css';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import obtenerProductosPorCategoria from '../components/obtenerProductosPorCategoria';

const ListarPorCategoria = ({ categoriaId }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(categoriaId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerProductosPorCategoria(categoriaId);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) { 
    return <div className="container-lista-admin">Loading...</div>;
  }

  if (error) {
    return <div className="container-lista-admin">Error: {error}</div>;
  }
  
  return (
    <div className="container-lista-admin">
      <h3 className="texto-titulo">Listado de Producto por Categoría</h3>
      <div className='bodyCard cardCentral cardPorCategoria'>
        <div id='hCard' className="HomeCards">
          {products.length > 0 ? (
            products.map(product => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <div>No hay productos disponibles para esta categoría.</div>
          )}
        </div>
      </div>
      <Link to='/home' className="btn-atras btn btn-detalle">Volver</Link>
    </div>
  );
};

export default ListarPorCategoria;
