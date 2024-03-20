// import '../assets/css/registrarProducto.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imagenRegistrar from '../assets/img/foto registrar.png';
import imagenFondo from '../assets/img/foto fondo.png';

'/src/assets/img/foto fondo.png'

export const RegistrarProducto = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/categorias/listar')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
    const btnClick = async (event) => {
        event.preventDefault();
        const imagen = document.getElementById("product-image").files[0];
        const name = document.getElementById("product-name").value;
        const cost = document.getElementById("cost").value;
        const categoria = document.getElementById("categoria").value;
        const description = document.getElementById("description").value;
        const responseElement = document.getElementById("response");
    
        const productData = {
          nombre: name,
          descripcion: description,
          precio: cost,
          categoria: {
            id: categoria,
          },
          caracteristicas: []
        };
    
        const url = 'http://localhost:8080/api/producto/guardar';
        let formData = new FormData();
        formData.append('producto', JSON.stringify(productData));
        formData.append('imagen', imagen);
        
    
        const settings = {
          method: 'POST',
          body: formData
        };
        try {
          const response = await fetch(url, settings);
          if (!response.ok) { 
            const errorData = await response.json(); 
            const message = errorData.message; 
            responseElement.innerText = message;
            responseElement.style.color = 'red';
          } else {
            const data = await response.json();
            responseElement.innerText = 'Product created successfully';
            responseElement.style.color = 'green';
          }
        } catch (error) {
          responseElement.innerText = 'An error occurred';
          responseElement.style.color = 'red';
        }
      }
      return (
        <div className="registro-container">
          <div className="body-container">
            <div className="company-image">
            <img className='img-agregar' src={imagenRegistrar} alt="Imagen de la empresa" />
            <img className='img-agregar-tablet img-agregar' src={imagenFondo} alt="Imagen de la empresa" />
            </div>
    
            <div className="product-form">
              <h3 className='titulo-editar'>Agregar Producto</h3>
              <form className='form-agregar'>
                <div className="form-input">

                <label className='name-input' htmlFor="product-image">Imagen del Producto</label>
                <input className='input-ingreso' type="file" id="product-image" name="product-image" />
    
                <label className='name-input' htmlFor="product-name">Nombre del Producto</label>
                <input className='input-ingreso' type="text" id="product-name" name="product-name" />
    
                <label  className='name-input' htmlFor="categoria">Categoría</label>
                <select className='input-ingreso name-categoria' id="categoria" name="categoria" value={selectedCategory} onChange={handleChange}>
                  <option value="">Selecciona categoria...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nombre}
                    </option>
                  ))}
                </select> 
      
    
                <label className='name-input' htmlFor="cost">Costo</label>
                <input className='input-ingreso' type="number" id="cost" name="cost" />
    
                <label className='name-input' htmlFor="description">Descripción</label>
                <textarea className='input-ingreso' id="description" name="description"></textarea>
    
                </div>
                <div>
                  <button className='button-custom' onClick={btnClick}>Agregar Producto</button>
                  <Link to='/admin' className='button-custom button-custom-cancelar'>Cancelar</Link>
                </div>
    
                <p id= "response"></p>
              </form>
            </div>
          </div>
    
          <h1>Holamjundo</h1>
        </div>
      );
}
