import React from 'react';;
import { Link } from 'react-router-dom';
import Calendario from '../components/Calendario';
import BotonReservas from '../components/BotonReservas';
import Gallery from '../components/Gallery'
import '../assets/css/cardDetalle.css'




const CardDetalle = ({ product }) => {

    if (!product) {
        return null; 
    }


    const caract = product.caracteristicas;

    const listaCaracteristicas = caract.map((caracteristica, index) => (
        <li key={index}>{caracteristica.nombre}</li>
    ));

    return (
        <div className="CardDetalleF">
            <div className='superiorDtalle'>
                <div className="btnBack">
                    <Link to="/home" className="btnGoback">
                        <img src="/src/assets/img/back.png" alt="atras" className='imgback' />
                    </Link>
                </div>
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
                <div className='Calendario'>
                    <h2>Visualiza la Disponibilidad de el producto</h2>
                </div>
                <div className='poliDiv'>
                    <div className='Politicas'> <h2><strong>Politicas de uso y alquiler</strong></h2></div>
                    <div>
                        <div>
                                <p>1. Uso Responsable de la Maquinaria:
                                - Los clientes deben utilizar la maquinaria de manera responsable y siguiendo todas las normas de seguridad establecidas.
                                - No se permite el uso de la maquinaria para fines distintos a los especificados en el contrato de alquiler.

                                2. Mantenimiento y Cuidado:
                                - Los clientes son responsables de mantener la maquinaria en condiciones adecuadas de funcionamiento durante el período de alquiler.
                                - Cualquier daño causado por un mal uso o negligencia del cliente será responsabilidad del mismo y podrá resultar en cargos adicionales.

                                3. Devolución a Tiempo:
                                - Los clientes deben devolver la maquinaria alquilada en la fecha acordada en el contrato. El retraso en la devolución puede resultar en cargos adicionales por día de retraso.

                                4. Seguro y Responsabilidad:
                                - Es responsabilidad del cliente asegurar la maquinaria alquilada durante el período de uso.
                                - La empresa de alquiler no se hace responsable de ningún accidente o daño causado por el mal uso de la maquinaria.</p>
                        </div>
                        <div><h6><a href="/Politicas">Leer más</a></h6></div>

                    </div>
                </div>
                    <div className='CalendarioReserva'>
                <Calendario />
            </div>
            <div className='btnDetalles'>
                <BotonReservas product={product} />
            </div>


        </div>
        
    );
};

export default CardDetalle;
