import React from 'react'
import './../assets/css/card_tipo.css'

const Card_tipo = ({Categoria}) => {
  return (
    <div className='container_tipo'>
        <img className='container-tipo-img' src="/src/assets/img/Group 48.png" alt="foto" />
        <h3 className='text-tipo'>{Categoria}Categoría</h3>
    </div>
  )
}

export default Card_tipo