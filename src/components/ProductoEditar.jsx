import '../assets/css/registrarProducto.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductoEditar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [producto, setProducto] = useState(null);
  const [productId, setProductId] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showShowProductButton, setShowShowProductButton] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/categoria/')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const cargarProducto = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/producto/${productId}`);
      if (!res.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      const jsonData = await res.json();
      setProducto(jsonData);
      setShowShowProductButton(false);
    } catch (error) {
      console.error('Error:', error);
      setProducto(null);
    }
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
      }
    };

    const url = 'http://localhost:8080/api/producto/actualizar';

    let formData = new FormData();
    formData.append('producto', JSON.stringify(productData));
    if (imagen) {
      formData.append('imagen', imagen);
    }

    const settings = {
      method: 'POST',
      body: formData
    };

    try {
      const response = await fetch(url, settings);
      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        alert(message);
      } else {
        const data = await response.json();
        alert('Actualización exitos');
        setUpdateSuccess(true);
        setProducto(null);
        setProductId(""); 
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('An error occurred');
    }
  };

  const handleAlertDismiss = () => {
    setUpdateSuccess(false);
  };

  return (
    <div className="registro-container">
      <div className="body-container">
        <div className="company-image">
          <img className='img-agregar' src='/src/assets/img/foto registrar.png' alt="Imagen de la empresa" />
          <img className='img-agregar-tablet img-agregar' src='/src/assets/img/foto fondo.png' alt="Imagen de la empresa" />
        </div>
        <div className="product-form">
          <h3 className='titulo-editar'>Editar Producto</h3>
          {updateSuccess && (
            <div className="alert alert-success alert-dismissible" role="alert">
              Actualización exitosa
              <button type="button" className="btn-close" onClick={handleAlertDismiss}></button>
            </div>
          )}
          <div className='form-agregar'>
            <div className="form-input">
              <label className='name-input' htmlFor="product-id">ID del Producto</label>
              <input className='input-ingreso' type="text" id="product-id" name="product-id" value={productId} onChange={handleProductIdChange} />
            </div>
            {showShowProductButton && (
              <div>
                <button className='button-custom' onClick={cargarProducto}>Mostrar producto</button>
                <Link to='/admin' className='button-custom button-custom-cancelar'>Cancelar</Link>
              </div>
            )}
          </div>
          {producto !== null && (
            <form className='form-agregar' onSubmit={btnClick}>
              <div className="form-input">
                <label className='name-input' htmlFor="product-image">Imagen del Producto</label>
                <input className='input-ingreso' type="file" id="product-image" name="product-image" />

                <label className='name-input' htmlFor="product-name">Nombre del Producto</label>
                <input className='input-ingreso' type="text" id="product-name" name="product-name" defaultValue={producto.nombre} />

                <label className='name-input' htmlFor="categoria">Categoría</label>
                <select className='input-ingreso name-categoria' id="categoria" name="categoria" value={selectedCategory} onChange={handleChange}>
                  <option value="">Selecciona categoría...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nombre}
                    </option>
                  ))}
                </select>

                <label className='name-input' htmlFor="cost">Costo</label>
                <input className='input-ingreso' type="number" id="cost" name="cost" defaultValue={producto.precio} />

                <label className='name-input' htmlFor="description">Descripción</label>
                <textarea className='input-ingreso' id="description" name="description" defaultValue={producto.descripcion}></textarea>
              </div>
              <div>
                <button className='button-custom' type="submit">Actualizar Producto</button>
                <Link to='/admin' className='button-custom button-custom-cancelar'>Cancelar</Link>
              </div>
              <p id= "response"></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoEditar;
