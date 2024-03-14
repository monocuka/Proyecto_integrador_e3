import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Detalle = () => {
    
    const { id } = useParams(); // Obtén el id de la URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const obtenerDetallesProductoPorId = async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/producto/id/${id}`);
                const data = await response.json();
                return data; 
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                throw error; // Lanza el error para que puedas manejarlo en el componente
            }
        };

        const obtenerDetallesProducto = async () => {
            try {
                const detalles = await obtenerDetallesProductoPorId(id);
                setProduct(detalles);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
            }
        };
        obtenerDetallesProducto();
    }, [id]);
    useEffect(() =>{
        console.log(product);
    }, product);
    if (!product) {
    
        return <div>Cargando...</div>;
    }

    return (
        <div className="CardsDetails">
            <div className="imagesDetail">
                {/* Muestra solo la primera imagen del producto */}
                <img src={product.imagenes[0].url} alt={`imagen-0`} />
            </div>
            <div className="infoCardDetail">
                <h5>{product.nombre}</h5>
                {/* <p><strong>Código:</strong> {product.codigo}</p> */}
                <p><strong>Descripción:</strong> {product.descripcion}</p>
                <p><strong>Precio:</strong> {product.precio}</p>
                <p><strong>Categoría:</strong> {product.categoria}</p>
                <div className="btnBack">
                    <button className="btnGoback">🔙</button>
                </div>
            </div>
        </div>
    );
};


