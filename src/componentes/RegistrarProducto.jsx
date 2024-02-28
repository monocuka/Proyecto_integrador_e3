import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/productoRegistrar.css';

const RegistrarProducto = () => {
  const btnClick = (event) => {
    event.preventDefault();
    //var product-image = document.getElementById("product-image");
    var name = document.getElementById("product-name");
    var cost = document.getElementById("cost");
    var quantity = document.getElementById("quantity");
    var description = document.getElementById("description");
    console.log("le diste al botón");

    const url = 'http://localhost:8080/productos/crear'+ cedula;
            const settings = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nombre: name,
              descripcion: description,
              precio: cost,
              codigo: codigo,
              cantidad: quantity,
              categoria: {
                cat_id: 1,
                nombre: "Compresores de aire",
                "descripcion": "Son ideales para darle potencia a otras herramientas neumáticas o bien realizar múltiples tareas como inflar neumáticos de coches y bicicletas, limpiar o hasta rociar pintura."

              }

              
              
          })

            }
            fetch(url,settings)
            .then(response => response.json())
            .then(data=> {
                var responseText = JSON.stringify(data);
                element.innerText = responseText;
            })
            .catch(error=> console.error('Error: ', error));
  }

  return (
    <div className="registro-container">
      <header>
        <div className="logo-container">
          <div>
            {/* Contenido del logo */}
          </div>
          <div className="slogan">
            <span className="line1">Construye sin límites</span>
            <span className="line2">Renta con facilidad</span>
          </div>
          <img src="src/img/imagesPI/ios/40.png" alt="Logo de la empresa" className="company-logo" />
        </div>
        <div className="line1">
          <i className="fa-brands fa-user-tie"></i>
          <span className="username">Laura Valero</span>
        </div>
      </header>

      <div className="body-container">
        <div className="company-image">
          <img src="src\img\imagesPI\Prueba\mano-vista-lateral-herramienta-electrica 11.svg" alt="Imagen de la empresa" />
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
            </select> */}

            <label htmlFor="cost">Costo</label>
            <input type="number" id="cost" name="cost" />

            <label htmlFor="quantity">Cantidad</label>
            <input type="number" id="quantity" name="quantity" />

            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description"></textarea>

            <div>
              <button className='button-custom' onClick={btnClick}>Agregar Producto</button>
              <button className='button-custom1' type="button">Cancelar</button>
            </div>

            <div>
              <button className='button-custom' type="submit">Volver</button>
            </div>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-images icon-white">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </footer>
    </div>
  );
};

export default RegistrarProducto;
