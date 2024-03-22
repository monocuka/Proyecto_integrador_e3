import React from 'react'
import './../assets/css/footer.css'

const Footer = () => {
  return (
    <div className='container_footer'>
        <p>&copy; 2024 Equipa Obra</p>
        <div className='container_iconoRS'>
            <img className='iconoRS' src="/src/assets/img/facebook.png" alt="facebook" />
            <img className='iconoRS' src="/src/assets/img/linkedin.png" alt="linkendin" />
            <img className='iconoRS' src="/src/assets/img/tweet.png" alt="tweet" />
            <img className='iconoRS' src="/src/assets/img/instagram.png" alt="instagram" />
        </div>
    </div>
  )
}

export default Footer