import '../assets/css/registrarProducto.css'
import herrramienta from '../assets/img/mano-vista-lateral-herramienta-electrica 11.svg';

export const RegistrarProducto = () => {
    const btnClick = async (event) => {
        event.preventDefault();
        var imagen = document.getElementById("product-image").files[0];
        var name = document.getElementById("product-name").value;
        var cost = document.getElementById("cost").value;
        var quantity = document.getElementById("quantity").value;
        var description = document.getElementById("description").value;
        var codigo = document.getElementById("code").value;
    
        var responseElement = document.getElementById("response");
    
        var productData = {
          nombre: name,
          descripcion: description,
          precio: cost,
          codigo: codigo,
          cantidad: quantity,
          categoria: {
            cat_id: 1,
            nombre: "Compresores de aire",
            descripcion: "Son ideales para darle potencia a otras herramientas neumáticas o bien realizar múltiples tareas como inflar neumáticos de coches y bicicletas, limpiar o hasta rociar pintura."
          }
        };
    
        const url = 'http://localhost:8080/products';
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
            const message = await response.text();
            responseElement.innerText = message;
            responseElement.style.color = 'red';
          } else {
            const data = await response.json();
            responseElement.innerText = 'Product created successfully';
            responseElement.style.color = 'green';
          }
        } catch (error) {
          console.error('Error: ', error);
          responseElement.innerText = 'An error occurred';
          responseElement.style.color = 'red';
        }
      }
    
    
      return (
        <div className="registro-container">
     
    
          <div className="body-container">
            <div className="company-image">
              <img src={herrramienta} alt="Imagen de la empresa" />
            </div>
    
            <div className="product-form">
              <br />
              <h2>Agregar Producto</h2>
              <form>
                <label htmlFor="product-image">Imagen del Producto</label>
                <input type="file" id="product-image" name="product-image" />
    
                <label htmlFor="product-name">Nombre del Producto</label>
                <input type="text" id="product-name" name="product-name" />
    
                <label htmlFor="product-code">Codigo</label>
                <input type="text" id="code" name="code" />
    
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
                <p id= "response"></p>
              </form>
            </div>
          </div>
    
          
        </div>
      );
}
