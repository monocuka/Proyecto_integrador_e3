 import '../assets/css/productoRegistrar.css'
export const RegistrarProducto = () => {
  const btnClick = async (event) => {
    event.preventDefault();
    const imagen = document.getElementById("product-image").files[0];
    const name = document.getElementById("product-name").value;
    const cost = document.getElementById("cost").value;
    const quantity = document.getElementById("quantity").value;
    const description = document.getElementById("description").value;
    const codigo = document.getElementById("code").value;

    const responseElement = document.getElementById("response");

    const productData = {
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
    
        const url = 'localhost:8080/api/producto/';
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
            <img className='img-agregar' src='/src/assets/img/foto registrar.png' alt="Imagen de la empresa" />
            <img className='img-agregar-tablet img-agregar' src='/src/assets/img/foto fondo.png' alt="Imagen de la empresa" />
            </div>
    
            <div className="product-form">
              <h2>Agregar Producto</h2>
              <form className='form-agregar'>
                <div className="form-input">

                <label className='name-input' htmlFor="product-image">Imagen del Producto</label>
                <input className='input-ingreso' type="file" id="product-image" name="product-image" />
    
                <label className='name-input' htmlFor="product-name">Nombre del Producto</label>
                <input className='input-ingreso' type="text" id="product-name" name="product-name" />
    
                <label className='name-input' htmlFor="product-code">Codigo</label>
                <input className='input-ingreso' type="text" id="code" name="code" />
    
                {/* <label className='name-input' htmlFor="category">Categoría</label>
                <select id="category" name="category">
                  { Opciones de categoría }
                </select> */}
    
                <label className='name-input' htmlFor="cost">Costo</label>
                <input className='input-ingreso' type="number" id="cost" name="cost" />
    
                <label className='name-input' htmlFor="quantity">Cantidad</label>
                <input className='input-ingreso' type="number" id="quantity" name="quantity" />
    
                <label className='name-input' htmlFor="description">Descripción</label>
                <textarea className='input-ingreso' id="description" name="description"></textarea>
    
                </div>
                <div>
                  <button className='button-custom' onClick={btnClick}>Agregar Producto</button>
                  <button className='button-custom button-custom-cancelar' type="button">Cancelar</button>
                </div>
    
                <p id= "response"></p>
              </form>
            </div>
          </div>
        </div>
      );
}
