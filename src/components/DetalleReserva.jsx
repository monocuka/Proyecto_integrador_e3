import React from 'react';
import { Link } from 'react-router-dom';
import Calendario from './Calendario';
import BotonReservas from './BotonReservas';
import Gallery from './Gallery'
import { useEffect, useState } from 'react';
import '../assets/css/cardDetalle.css'
import imgBack from '../assets/img/back.png'
//import { useData } from '../context/DataContext';
//import axios from 'axios';



const DetalleReserva = ({ product }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    //const history = useHistory();

    if (!product) {
        return null;
    }

    const [reserva, setReserva] = useState(null);

    useEffect(() => {
        if (product && product.id) {
            fetch(`http://localhost:8080/api/reserva/producto/${product.id}`)
                .then(response => response.json())
                .then(data => {
                    setReserva(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [product]);

    const caract = product.caracteristicas;

    const listaCaracteristicas = caract.map((caracteristica, index) => (
        <li key={index}>{caracteristica.nombre}</li>
    ));

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];

        // Lógica para cuando se carga el calendario por primera vez
        if (!startDate) {
            setStartDate(formattedDate);
            return;
        }

        // Lógica para cuando se agrega la fecha hasta
        if (startDate && !endDate) {
            if (formattedDate < startDate) {
                setEndDate(startDate);
                setStartDate(formattedDate);
            } else {
                setEndDate(formattedDate);
            }
            return;
        }

        // Lógica para cambiar las fechas si ambas están cargadas
        // Reinicia el primer valor y establece el segundo en null
        if (startDate && endDate) {
            setStartDate(formattedDate);
            setEndDate(null);
            return;
        }

    };

    let fechaDesde;
    let fechaHasta;

    React.useEffect(() => {
        fechaDesde = startDate;
        fechaHasta = endDate;
        console.log("cosa", startDate, endDate);

    }, [startDate, endDate]);





    return (
        <div className="CardDetalleF">
            <div className='superiorDtalle'>
                
                <h2 className='titleDetalle'>Detalle del Producto</h2>
            </div>

            {/* Galería de imágenes */}
            <Gallery imageUrls={product.imagenes.map(imagen => imagen.urlImagen)} />

            <div className='nombrePuntuacion'>
                <h3>{product.nombre}</h3>
                <p>⭐⭐⭐⭐</p>
            </div>
            <div className="infoCardDetail">
                <div className='precio'>
                    <p><strong>Precio: $</strong> {product.precio}</p>
                </div>
                <div className='InfoDetalle'>
                    <p><strong>Descripción:</strong> {product.descripcion}</p>
                    <p><strong>Categoría:</strong> {product.categoria.nombre}</p>
                </div>
            </div>
            <div className='Caracteristicas'>
                <h2><strong>Características.</strong></h2>
                <ul className='listCaracteristicas'>{listaCaracteristicas}</ul>
            </div>
           
               
        </div>
        
    );
};

export default DetalleReserva;