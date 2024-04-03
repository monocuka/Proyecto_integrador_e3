import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../assets/css/registrarProducto.css';

export const RegistrarProducto = () => {

    const [categorias, setCategorias] = useState([]);
    const initStateProducto = {
      nombre:  "",
      descripcion: "",
      precio:  0.0,
      categoria: {},
      caracteristicas: []
    };
    const [producto, setProducto] = useState(initStateProducto);

    const [imagen, setImagen] = useState(null);
    const [imagenUrl, setImagenUrl] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/api/categoria/listar')
          .then(response => response.json())
          .then(data => setCategorias(data))
          .catch(error => console.error('Error:', error));
    }, []);

    const onInputChange = ({ target }) => {
      const { name, value } = target;
      setProducto({
          ...producto,
          [ name ]: ( name == 'categoria' ) ? { id: value} : value
      });
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        setImagenUrl(URL.createObjectURL(file));
    }

    useEffect(() => {
      const nombreInput = document.getElementById('nombre');
      const precioInput = document.getElementById('precio');
      const categoriaInput = document.getElementById('categoria');
  
      nombreInput.oninvalid = (e) => {
          e.target.setCustomValidity('Por favor, ingresa el nombre del producto');
      };
  
      nombreInput.oninput = (e) => {
          e.target.setCustomValidity('');
      };
  
      precioInput.oninvalid = (e) => {
        if (e.target.value <= 0) {
          e.target.setCustomValidity('Por favor, ingresa un precio mayor a 0');
      } else {
          e.target.setCustomValidity('Por favor, ingresa el precio del producto');
      }
      };

      precioInput.oninput = (e) => {
        if (parseFloat(e.target.value) > 0) {
          e.target.setCustomValidity('');
        } else {
          e.target.setCustomValidity('Por favor, ingresa un precio mayor a 0');
        }
      };
  
      categoriaInput.oninvalid = (e) => {
          e.target.setCustomValidity('Por favor, selecciona una categoría');
        };
        
      categoriaInput.oninput = (e) => {
        if(e.target.value != ''){
          e.target.setCustomValidity('');
        }else{
          e.target.setCustomValidity('Por favor, selecciona una categoría');
        }
      };

      // Validación inicial para el campo precio
    if (parseFloat(precioInput.value) <= 0) {
      precioInput.setCustomValidity('Por favor, ingresa un precio mayor a 0');
    }

    if(categoriaInput.value === ''){
      categoriaInput.setCustomValidity('Debe seleccionar una categoria');
    }
  }, [producto]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    const productoData = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: { id: producto.categoria.id },
        caracteristicas: producto.caracteristicas
    };

    // Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Your work has been saved",
    //     showConfirmButton: false,
    //     timer: 1500
    // });

    formdata.append("producto", JSON.stringify(productoData));

    if (imagen) {
        formdata.append("imagen", imagen, imagen.name);
    }

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    Swal.fire({
        title: "Desea registrar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, registrar"
    }).then((result) => {
      if (result.isConfirmed) {
          fetch("http://localhost:8080/api/producto/guardar", requestOptions)
              .then((response) => {
                  if (!response.ok) {
                      return response.text().then((error) => {
                          throw new Error(error);
                      });
                  }
                  return response.text();
              })
              .then((result) => {
                  Swal.fire({
                      title: "Registrado!",
                      icon: "success"
                  });
                  setProducto(initStateProducto);
                  setImagen(null);
              })
              .catch((error) => {
                  try {
                      const jsonError = JSON.parse(error.message);
                      Swal.fire({
                          title: "Error",
                          text: jsonError.mensaje,
                          icon: "error"
                      });
                  } catch (parseError) {
                      console.error('Error al parsear el mensaje JSON:', parseError);
                      Swal.fire({
                          title: "Error",
                          text: errorMessage,
                          icon: "error"
                      });
                  }
              });
      }
    });
  }

    return (
        <div className="container-form-editar">
            <form className="dropzone-box" onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div>
                        <h2 className="form-editar-titulo-imagen">Subir imagen del producto</h2>
                        <div className="dropzone-area">
                            <div className="file-upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                    stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                </svg>
                            </div>
                            <p>Click to upload or drag and drop</p>
                            <input type="file" id="imagen" name="imagen" onChange={ onFileChange } required/>
                            <p className="message">{(imagen) ? imagen?.name : 'No Files Selected'}</p>
                        </div>
                    </div>
                    <div className="form-editar-inputs">
                        <div className="form-editar-producto-input">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required placeholder="Ingrese el nombre del producto" value={producto.nombre} onChange={onInputChange}/>
                        </div>
                        <div className="form-editar-producto-input">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" id="precio" name="precio" required value={producto.precio} onChange={onInputChange}/>
                        </div>
                        <div className="form-editar-producto-input">
                            <label htmlFor="ciudad">Categoria</label>
                            <select id="categoria" name="categoria" onChange={onInputChange} value={producto.categoria.id || ""}>
                              <option value="">Debe seleccionar una categoría</option>
                              {categorias?.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                  {categoria.nombre}
                                </option>
                              ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea id="descripcion" name="descripcion" placeholder="Breve descripción del producto"value={producto.descripcion} rows="3" cols="50" onChange={onInputChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className="dropzone-actions">
                    <Link to="/home" className="btn btn--secondary">
                        Cancelar
                    </Link>
                    <button id="submit-button" type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    )
}
