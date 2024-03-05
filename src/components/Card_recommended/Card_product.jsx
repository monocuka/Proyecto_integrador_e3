import React, { useEffect, useState } from 'react'
import Card_recommended from './Card_ recommended';
import { Array_Card_Recommended } from './Array_Card_Recommended';
import './../../assets/css/Card_recommendad.css'

const Card_product = () => {

  const [products, setProducts] = useState('null')

  useEffect(() => {
      fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }),[]

    const randomIndex = Math.floor(Math.random() * Array_Card_Recommended.length);
    const randomProduct = Array_Card_Recommended[randomIndex];

  return (
    <div className='card-product-reco'>
        <Card_recommended
            key={randomProduct.id}
            img={randomProduct.img}
            name={randomProduct.name}
            description={randomProduct.description}
            precio={randomProduct.precio}
            rating={randomProduct.rating}
            rentalCount={randomProduct.rentalCount}
        />
    </div>
  )
}

export default Card_product
