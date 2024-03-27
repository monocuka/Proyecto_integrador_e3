import React from 'react';
import Card_tipo from './Card_tipo';
import '../assets/css/card_tipo.css';

const Card_categoria = ({ categoria, onCategoriaClick }) => {
  const cantidadMaxima = 5; // Puedes ajustar este valor según tus necesidades
  
  const handleClick = () => {
    onCategoriaClick(categoria.id); // Llama a la función onCategoriaClick con el ID de la categoría seleccionada
  };

  return (
    <div className='card-tipo'>
      <Card_tipo cantidadMaxima={cantidadMaxima} onClick={handleClick} />
    </div>
  );
};

export default Card_categoria;
