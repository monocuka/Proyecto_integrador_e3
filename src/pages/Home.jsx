import { useEffect, useState } from 'react';
// import '../assets/css/home.css'
import Card from '../components/Card';
import Buscador from '../components/Buscador';
import Recommended from '../components/Card_recommended/Recommended';
import Card_categoria from '../components/Card_categoria';
import '../assets/css/card_tipo.css'
import { Link } from 'react-router-dom';

export const Home = () => {

    const [productos, setProductos] = useState([]);
    const updateProductos = (newProductos) => setProductos(newProductos);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/producto/listar');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const postsData = await response.json();
                setProductos(postsData.slice(0, 8));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Mostrar máximo 8 productos
    // const productosMostrados = productos.slice(0, 8);

    return (
        <>
            <div className='buscador'>
            <h1 className='titulo-buscador'>Encuentra de forma fácil tus herramientas</h1>
            <p className="parrafo-buscador">Motoniveladoras, retroexcavadoras, tractores topadores y muchas más herramientas.</p>
            <Buscador updateProductos={updateProductos}/>
            </div>
            <div id='bodyCard'>
                <div id='hCard' className="HomeCards">
                    {productos.map(producto => (
                        <Card key={producto.id} product={producto} />
                    ))}
                </div>
            </div>
            <div className="container-titulo-categoria">
                <h3 className='titulo_tipo background-tittle'>Busqueda por tipo de maquinaria</h3>
                {/* <Link to='/agregarCategoria' className='agregar-categoria'>Agregar categoría</Link> */}
            </div>

            <div className='card-recomendado'>
                <Card_categoria/>
            </div>
            <div className="fondo-recomendado">
            <h3 className='titulo_tipo'>Lo más recomendado</h3>
            <div className='card-tipo card-recomendado'>
                <Recommended/>
            </div>
            </div>
        </> 
        );
}
