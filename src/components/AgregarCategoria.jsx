import '../assets/css/registrarProducto.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AgregarCategoria = () => {

    const btnClick = async (event) => {
        event.preventDefault();
        const imagen = document.getElementById("product-image").files[0];
        const name = document.getElementById("product-name").value;
        const description = document.getElementById("description").value;
        const responseElement = document.getElementById("response");
    
        const productData = {
          nombre: name,
          descripcion: description,
        };
    
        const url = 'http://localhost:8080/api/categoria/guardar';

        let formData = new FormData();
        formData.append('producto', JSON.stringify(productData));
        formData.append('imagen', imagen);
    
        const settings = {
          method: 'POST',
          body: formData
        };
    
        try {
          const response = await fetch(url, settings);
          if (!response.ok) { // if HTTP-status is 200-299
            // get the error message from the body
            const errorData = await response.json(); // parse the response body as JSON
            const message = errorData.message; // extract the error message
            responseElement.innerText = message;
            responseElement.style.color = 'red';
          } else {
            const data = await response.json();
            alert('Categoría creada exitosamente');
          }
        } catch (error) {
          console.error('Error: ', error);
          alert('An error occurred');
        }
      }

      return (
        <div className="registro-container">
          <div className="body-container">
            <div className="company-image">
            <img className='img-agregar' src='/src/assets/img/foto registrar.png' alt="Imagen de la empresa" />
            <img className='img-agregar-tablet img-agregar' src='/src/assets/img/foto fondo.png' alt="Imagen de la empresa" />
            </div>
    
            <div className="product-form">
              <h3 className='titulo-editar'>Agregar Categoría</h3>
              <form className='form-agregar'>
                <div className="form-input">
                    <label className='name-input' htmlFor="product-image">Imagen  de la categoría</label>
                    <input className='input-ingreso' type="file" id="product-image" name="product-image" />
        
                    <label className='name-input' htmlFor="product-name">Nombre de la categoría</label>
                    <input className='input-ingreso' type="text" id="product-name" name="product-name" />
        
                    <label className='name-input' htmlFor="description">Descripción</label>
                    <textarea className='input-ingreso' id="description" name="description"></textarea>
                </div>
                <div>
                  <button className='button-custom' onClick={btnClick}>Agregar Categoría</button>
                  <Link to="/home">
                      <button className='btnIndetificar' type="button">Cancelar</button>
                  </Link>
                </div>
    
                <p id= "response"></p>
              </form>
            </div>
          </div>
    
          
        </div>
      );
}
