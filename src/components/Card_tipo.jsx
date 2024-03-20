import React, { useState, useEffect } from 'react';
import './../assets/css/card_tipo.css';

const Card_tipo = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categorias/listar');

        if (!res.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {categorias.map((categoria, key) => (
        <div key={key} className='container_tipo'>
          <img className='container-tipo-img' src={categoria.imagenUrl} alt={categoria.nombre} />
          <h3 className='text-tipo'>{categoria.nombre}</h3>
        </div>
      ))}
    </div>
  );
}

export default Card_tipo;
