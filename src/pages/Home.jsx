import { useEffect, useState } from 'react';
import '../assets/css/home.css'
import Card from '../components/Card';


export const Home = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const postsData = await response.json();
                console.log(postsData);
                setProductos(postsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Mostrar máximo 8 productos
    const productosMostrados = productos.slice(0, 8);

    return (
        <div id='bodyCard'>
            <div id='hCard' className="HomeCards">
                {productosMostrados.map(producto => (
                    <Card key={producto.id} product={producto} />
                ))}
            </div>
        </div>
        
    );
}
