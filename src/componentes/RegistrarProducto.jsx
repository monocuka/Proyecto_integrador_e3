import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  '../styles/productoRegistrar.css';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" />

const RegistrarProducto = () => {
  return (
    <div className="registro-container">
   <header>
  <div class="logo-container">
    <div>
      
    </div>
    <div class="slogan">
      <span class="line1">Construye sin límites</span>
      <span class="line2">Renta con facilidad</span>
    </div>
    <img src="src\img\imagesPI\ios\40.png" alt="Logo de la empresa" class="company-logo" />
    
  </div>
  <div class="line1">
  <i class="fa-sharp fa-solid fa-user-tie"></i>
    <span class="username">Laura Valero</span>
    
  </div>
</header>

      <div className="body-container">
        <div className="company-image">
          <img src="src\img\imagesPI\Prueba\ManoSierra.png" alt="Imagen de la empresa" />
        </div>

        <div className="product-form">
          <br />
          <h2>Agregar Producto</h2>
          <form>
            <label htmlFor="product-image">Imagen del Producto</label>
            <input type="file" id="product-image" name="product-image" />

            <label htmlFor="product-name">Nombre del Producto</label>
            <input type="text" id="product-name" name="product-name" />

           {/* <label htmlFor="category">Categoría</label>
            <select id="category" name="category">
              { Opciones de categoría }
            </select>*/}

            <label htmlFor="cost">Costo</label>
            <input type="number" id="cost" name="cost" />

            <label htmlFor="quantity">Cantidad</label>
            <input type="number" id="quantity" name="quantity" />

            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description"></textarea>

            <div>
            <button className='button-custom' ctype="submit">Agregar Producto</button>
            <button className='button-custom1' type="button">Cancelar</button>
            </div>

            <div>
        <button className='button-custom' ctype="submit">Volver</button>
        </div>

            
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-images icon-white">
          <i class="fa-brands fa-facebook "></i>
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-instagram"></i>
        </div>
      </footer>
    </div>
    /* Cambiar el color de los íconos a blanco */

  );
};

export default RegistrarProducto;
