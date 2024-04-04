import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetalle from '../components/CardDetalle';
import serverEndPoint from '../components/constans';



export const Detalle = () => {
    
    const { id } = useParams(); // Obtén el id de la URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const obtenerDetallesProductoPorId = async (id) => {
            try {
                const response = await fetch(`${serverEndPoint}/api/producto/id/${id}`);
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
    }, []);

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div id="bodyCardDetalle">
            <div className="imagesDetail">
                <div id='dCard' className="DetailCard">
                    <CardDetalle product={product} />
                </div>
            </div>
        </div>
    );
};
