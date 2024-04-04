import React, { useState, useEffect, useContext } from 'react';
import '../assets/css/listarProducto.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import serverEndPoint from '../components/constans';

export const ListarProductos = () => {
  const [productos, setproductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useContext( AuthContext );
  const { usuario } = authState;

  const isAdmin = usuario.roles.some(rol => rol.nombreRol === "ROLE_ADMIN");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${serverEndPoint}/api/producto/listar`);
        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        
        const jsonData = await res.json();
        setproductos(jsonData);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
      }
    };
    
    fetchData();
    
  }, []);
    
  return(
    <div className='lista-producto-container'>
      <div className="table-widget">
			  <span className="caption-container">
			  	<span className="table-title">
			  		Lista de Productos
			  	</span>
			  </span>
			<div className="table-wrapper">
        <table>
          <thead>
              <tr>
                  <th className="sticky-left">Producto</th>
                  <th className="sticky-left">Precio [$]</th>
              </tr>
          </thead>
          <tbody id="table-rows">
              {productos.map( producto => {
                 return <tr key={producto.id}>
                          <td className="stock sticky-left">
                              <div className="stock-wrapper">
                                  <img src={producto.imagenes[0].urlImagen} alt="${stock.name}"/>
                                  <div className="stock-info">
                                      <span className="stock-info__ticker">
                                          {producto.nombre}
                                      </span>
                                      <span className="stock-info__name">
                                        {producto.categoria.nombre}
                                      </span>
                                  </div>
                              </div>
                          </td>
                          <td>$100</td>
                          {isAdmin && (
                            <td className="sticky-right">
                                <Link to={`/editarProducto/${producto.id}`} className="btn btn--primary">Modificar</Link>
                            </td>
                          )}
                        </tr>
              })}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
            <div className="sticky-volver">
              <Link to='/home' >Volver</Link>
            </div>
			</div>
		</div>
    </div>
  )
};
