import React, { useState, useEffect } from 'react';
import '../assets/css/card_tipo.css';
import { Link } from 'react-router-dom';
import obtenerProductosPorCategoria from './obtenerProductosPorCategoria';

const Card_tipo = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categoria/listar');

        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const data = await res.json();
        setCategorias(data);
        console.log(data)

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // Función para manejar el clic en una categoría
  const handleClickCategoria = async (categoriaId) => {
    try {
      // Haz una solicitud a la API para obtener los productos asociados a la categoría
      const productos = await obtenerProductosPorCategoria(categoriaId);
      console.log(categoriaId)
      console.log(p)
      // console.log(productos); // Aquí puedes manejar los productos obtenidos, como actualizar el estado para mostrarlos en la interfaz
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
    }
  };

  return (
    <div className='card-tipo'>
      {categorias.map((categoria, key) => (
        <Link key={key} to={`/productosPorCategoriaPage/${categoria.id}`} className='container-tipo'>
          <h3 className='text-tipo'>{categoria.nombre}</h3>
        </Link>
      ))}
    </div>
  );
}

export default Card_tipo;
