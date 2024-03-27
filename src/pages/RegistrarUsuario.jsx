import '../assets/css/RegistrarUsuario.css'
//import useInput from '../components/Registrar_Usuario/UseInput'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const RegistrarUsuario = () => {

    const [formData, setFormData] = useState({
        Name: "",
        lastName: "", 
        email: "",
        pass: "",
        pass2: ""
    });
    
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleFocus = () => {
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(formData.Name) ||
            formData.Name.length <= 5 || formData.pass.length <= 8 ||
            formData.pass !== formData.pass2 ||
            !emailRegex.test(formData.email)) {
            setSuccessMessage("");
            setError("ERROR EN LOS DATOS")
        } else {
            
            const data = {
                name: formData.Name,
                lastName: formData.lastName, 
                email: formData.email,
                password: formData.pass
            };
            fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage("User registered successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
                setError("Failed to register user");
            });
    
            setError(true);
        }
        console.log("Formulario enviado exitosamente!: ");
    }
    

    return (
        <div id='Registro'>
            <div id='imagenPlusCont'>
            <h2 className='registrar'>Registrarse</h2>
                <div className="company-image">
                    <div className='img-agregar'>
                        <img src='/src/assets/img/foto registrar.png' alt="Imagen de la empresa" />
                    </div>
                    <div className='img-agregar-tablet'>
                        <img id='imgtablet' src='/src/assets/img/foto fondo.png' alt="Imagen de la empresa" />
                    </div>
                </div>
                <form className='formregistrarusu' onSubmit={handleSubmit}>
                    <div id='formplusbuttons'>
                        <div id="contenedorForm">
                            <div id="name"></div>
                            <div id="boxInput">
                                <label >Nombre: </label>
                                <input
                                    type='text'
                                    id='Name'
                                    className="form-control"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                            <div id="boxInput">
                                <label >Apellido: </label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name="lastName"
                                    id='lastName'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                            <div id="boxInput">
                                <label >E-mail: </label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name="email"
                                    id='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                            <div id="boxInput">
                                <label >Contraseña: </label>
                                <input
                                    type='password'
                                    className="form-control"
                                    name="pass"
                                    id='pass'
                                    value={formData.pass}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                            <div id="boxInput">
                                <label >Repetir Contraseña: </label>
                                <input
                                    type='password'
                                    className="form-control"
                                    name="pass2"
                                    id='pass2'
                                    value={formData.pass2}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                        </div>

                        <div className='recibirNotificacion'>
                            <div className='notifi1'>
                                <input type="checkbox" id="cbox1" value="first_checkbox" />
                            </div>
                            <div className='notifi2'> 
                                <p>No quiero recibir notificaciones con promociones de Equipa Obra por email.</p>
                            </div>
                        </div>
                        <div className='terminos'>
                            <p>Al registrarte estás aceptando nuestros <a href="https://www.freepikcompany.com/legal?_gl=1*11qmuq7*fp_ga*MTYzODM1MzY1OC4xNjM0MjAwMjcy*fp_ga_QWX66025LC*MTY0MTI5MTg2Ny4yNzkuMC4xNjQxMjkxODY4LjU5*test_ga*NDA4Mjg4MTQ1LjE2MTMwNDU4MTA.*test_ga_18B6QPTJPC*MTY0MTI5MTg2Ny4yODUuMC4xNjQxMjkxODY3LjYw#nav-freepik">Términos de Uso</a> y <a href="https://www.freepikcompany.com/privacy?_gl=1*11qmuq7*fp_ga*MTYzODM1MzY1OC4xNjM0MjAwMjcy*fp_ga_QWX66025LC*MTY0MTI5MTg2Ny4yNzkuMC4xNjQxMjkxODY4LjU5*test_ga*NDA4Mjg4MTQ1LjE2MTMwNDU4MTA.*test_ga_18B6QPTJPC*MTY0MTI5MTg2Ny4yODUuMC4xNjQxMjkxODY3LjYw">Política de Privacidad</a>.</p>


                            <div className='buttonsRegCan'>
                                <button className='button-custom'
                                    type='submit' >
                                    Registrarse
                                </button>
                                <Link to="/home">
                                    <button className='btnIndetificar' type="button">Cancelar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                </form>
            </div>
        </div>
    )
}