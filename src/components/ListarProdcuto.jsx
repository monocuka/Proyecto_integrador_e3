import React, { useState, useEffect } from 'react';
import '../assets/css/listarProducto.css';
import { Link } from 'react-router-dom';

const ListarProducto = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  const imagenUrl = products.length > 0 && products[0].imagenes.length > 0 ? products[0].imagenes[0].urlImagen : null;
  console.log(imagenUrl)

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
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container-lista-admin">
      <h3 className="texto-titulo">Listado de Productos</h3>
      <div className='container-listar'>
      {products.map(product => (
        <div key={product.id} className="container_tipo-listar">
          <img className='container-listar-img' src={`http://${product.imagenUrl}`} alt={product.nombre} />

          <h4 className='text-listar'>{product.nombre}</h4>
          <h4 className='text-listar'>Id: {product.id}</h4>
          <div className="btn">
            <div className="columna-izquierda">
              <Link className="btn-detalle">Detalles</Link>
              <button className="btn-eliminar">Eliminar</button>
            </div>
          </div>
        </div>
      ))}
      </div>
      <Link to='/admin' className="btn-atras btn btn-detalle">Volver</Link>
    </div>
  );
};

export default ListarProducto;
