import React from 'react'
import './../../assets/css/Card_recommendad.css'
import Card_product from './Card_product'



const Recommended = () => {
  return (
    <div className='background-recommended'>
          <div className="Card_recommended_container">
              <Card_product/>
              <Card_product/>
          </div>
    </div>
  )
}

export default Recommended