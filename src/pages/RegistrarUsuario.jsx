import '../assets/css/RegistrarUsuario.css'
import logoSinFondo from '../assets/img/logo-sin-fondo-ni letras.png';
import iconoPassword from '../assets/img/password.svg';
import iconoEmail from '../assets/img/email.svg';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export const RegistrarUsuario = () => {

    const [formData, setFormData] = useState({
        name: "",
        lastName: "", 
        email: "",
        pass: "",
        pass2: ""
    });

    const [validation, setValidation] = useState({
        isEmailValid: true,
        isPasswordValid: true
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let isEmailValid = validation.isEmailValid;

        if (name === 'email') {
            const emailRegex = /^[^\s]+@[^\s]+(\.[^\s]+)+$/;
            isEmailValid = emailRegex.test(value);
        }

        setFormData({
            ...formData,
            [name]: value,
        });

        setValidation({
            ...validation,
            isEmailValid: isEmailValid,
        });
    }

    useEffect(() => {
        const isPasswordValid = formData.pass === formData.pass2 && formData.pass.length >= 8;
        setValidation({
            ...validation,
            isPasswordValid: isPasswordValid
        });
    }, [formData.pass, formData.pass2]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

        if (!nameRegex.test(formData.name) ||
            formData.name.length <= 2 ||
            !validation.isEmailValid ||
            !validation.isPasswordValid) {
            // setError("Error al registrar usuario");
            console.log("Error");
            return;
        } 
        
        const data = {
            name: formData.name,
            lastName: formData.lastName, 
            email: formData.email,
            password: formData.pass
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
        
        Swal.fire({
            title: "Desea registrar el usuario cargado?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, registrar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8080/api/auth/register', requestOptions)
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



        // try {
        //     const response = await fetch('http://localhost:8080/api/auth/register', requestOptions);
        //     const responseData = await response.json();
        //     console.log('Success:', responseData);
        //     setSuccessMessage("User registered successfully!");

        // } catch (error) {
        //     console.error('Error:', error);
        //     setError("Error al registrar usuario");
        // }
    }
    

    return (
        <>
        <div className='body-login'>
            <div className="centering">
                <form className="my-form" onSubmit={handleSubmit}>
                    <div className="login-welcome-row">
                        <img
                            className="login-welcome"
                            src={logoSinFondo}
                            alt="Astronaut"
                        />
                        <h1>Registrarse</h1>
                    </div>
                    <div className="text-field">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            aria-label="nombre"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            value={formData.name}
                            onInput={handleInputChange}
                            required
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="nombre">Apellido:</label>
                        <input
                            aria-label="apellido"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Apellido"
                            value={formData.lastName}
                            onInput={handleInputChange}
                            required
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            aria-label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={formData.email}
                            onInput={handleInputChange}
                            required
                            className={validation.isEmailValid ? 'valid' : 'invalid'}
                        />
                        {!validation.isEmailValid && <p className="error-message">El correo electrónico no es válido</p>}
                        {validation.isEmailValid && <img alt="Email Icon" title="Email Icon" src={iconoEmail}/>}
                    </div>
                    <div className="text-field">
                        <label htmlFor="password">Password:</label>
                        <input
                          id="pass"
                          type="text"
                          aria-label="Password"
                          name="pass"
                          placeholder="Tu Password"
                          value={formData.pass}
                          onInput={handleInputChange}
                          required
                          className={validation.isPasswordValid ? 'valid' : 'invalid'}
                        />
                        {!validation.isPasswordValid && <p className="error-message">La contraseña debe tener al menos 8 caracteres y coincidir con la confirmación de la contraseña</p>}
                        {validation.isPasswordValid && <img alt="Email Icon" title="Email Icon" src={iconoPassword}/>}
                    </div>
                    <div className="text-field">
                        <label htmlFor="repit-password">Repetir Password:</label>
                        <input
                          id="pass2"
                          type="text"
                          aria-label="repit-Password"
                          name="pass2"
                          placeholder="Tu Password"
                          value={formData.pass2}
                          onInput={handleInputChange}
                          required
                          className={validation.isPasswordValid ? 'valid' : 'invalid'}
                        />
                        {!validation.isPasswordValid && <p className="error-message">La contraseña debe tener al menos 8 caracteres y coincidir con la confirmación de la contraseña</p>}
                        {validation.isPasswordValid && <img alt="Email Icon" title="Email Icon" src={iconoPassword}/>}
                    </div>
                    <input type="submit" className="my-form__button" value="Registrarse" />
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="my-form__actions">
                        <div className="my-form__signup">
                            <Link to={'/home'} title='Crear una Cuenta'>
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className='espacio-menu-footer' />
        </>
    );
}
