import { useState, useEffect } from "react";
import serverEndPoint from "./constans";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export const FormEditarProducto = ({ id }) => {

    const [categorias, setCategorias] = useState([]);
    
    const [producto, setProducto] = useState({
        id: "",
        nombre:  "",
        descripcion: "",
        precio:  0.0,
        categoria: {}
    });

    const [imagen, setImagen] = useState(null);
    const [imagenUrl, setImagenUrl] = useState("");
    
    useEffect(() => {
        fetch(`${serverEndPoint}/api/producto/id/`+id)
        .then(response => response.json())
        .then(data => {
            setProducto({
                id: data.id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                categoria: { id: data.categoria.id },
                caracteristicas: data.caracteristicas.map(categoria => ({ id: categoria.id }))
            });
        })
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        fetch(`${serverEndPoint}/api/categoria/listar`)
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

        formdata.append("producto", JSON.stringify(productoData));
        if (imagen) {
            formdata.append("imagen", imagen, imagen.name);
        }

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(`${serverEndPoint}/api/producto/actualizar`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "El producto se modifico correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => window.location.href = "/listarProductos"); 
            })
            .catch((error) => console.error(error));
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
                            <input type="file" id="imagen" name="imagen" onChange={ onFileChange }/>
                            <p className="message">{(imagen) ? imagen?.name : 'No Files Selected'}</p>
                        </div>
                    </div>
                    <div className="form-editar-inputs">
                        <div className="form-editar-producto-input">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required value={producto.nombre} onChange={onInputChange}/>
                        </div>
                        <div className="form-editar-producto-input">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" id="precio" name="precio" required value={producto.precio} onChange={onInputChange}/>
                        </div>
                        <div className="form-editar-producto-input">
                            <label htmlFor="ciudad">Categoria</label>
                            <select id="categoria" name="categoria" value={producto.categoria.id} onChange={onInputChange}>
                                {categorias?.map( categoria => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option> )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea id="descripcion" name="descripcion" value={producto.descripcion} rows="3" cols="50" onChange={onInputChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className="dropzone-actions">
                    <Link to="/listarProductos" className="btn btn--secondary">
                        Cancelar
                    </Link>
                    <button id="submit-button" type="submit">
                        Modificar
                    </button>
                </div>
            </form>
        </div>
    )
}
