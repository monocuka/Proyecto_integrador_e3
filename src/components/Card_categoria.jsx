import React from 'react'
import Card_tipo from './Card_tipo'
import { categoria } from './data-categorias'
import '../assets/css/card_tipo.css'

export const Card_categoria = () => {
   return (
        <div className='card-tipo'>
          {categoria.map((item) => (
            <Card_tipo key={item.id} categoria={item.categoria} imageurl={item.imageurl} />
          ))}
        </div>
  )
}
