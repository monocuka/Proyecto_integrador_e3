import React from 'react';
import Card_tipo from './Card_tipo';

export const Card_categoria = () => {
  const cantidadMaxima = 5; // Puedes ajustar este valor según tus necesidades
  
  return (
    <div className='card-tipo'>
      <Card_tipo cantidadMaxima={cantidadMaxima} />
    </div>
  );
};
