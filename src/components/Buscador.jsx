import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Calendario from './Calendario'; // Importa tu componente de Calendario
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Buscador = ({ updateProductos }) => {
    const [nombreBusqueda, setNombreBusqueda] = useState('');
    const [fechaBusqueda, setFechaBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar la visibilidad del componente de Calendario
    const node = useRef();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleDateChange = (date) => {
        const today = new Date(); // Obtener la fecha de hoy
        const formattedToday = today.toISOString().split('T')[0];

        const selectedDate = new Date(date);
        if (selectedDate < today) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pueden seleccionar fechas anteriores a hoy.'
            });
            return;
        }

        const formattedDate = selectedDate.toISOString().split('T')[0];
        if (!startDate) {
            setStartDate(formattedDate);
        } else if (!endDate) {
            setEndDate(formattedDate);
        } else {
            setStartDate(formattedDate);
            setEndDate(null);
        }
    };

    const toggleCalendario = () => {
        setMostrarCalendario(!mostrarCalendario); // Cambia el estado de visibilidad del componente de Calendario
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setNombreBusqueda(value);

        try {
            const response = await fetch(`http://localhost:8080/api/producto/nombresSimilares/${value}`);
            const data = await response.json();
            setFilteredSuggestions(data);

            if (Array.isArray(data)) {
                setFilteredSuggestions(data.map(item => item.nombre));

            } else {
                setFilteredSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al buscar nombres similares.'
            });
        }
    };

    const handleClickOutside = (e) => {

        if (node.current && !node.current.contains(e.target)) {
            // Click outside the component
            setFilteredSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchData = async () => {
        setFetchStatus('loading');
        try {

            if (startDate === null || endDate === null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes completar las fechas.'
                });
                setFetchStatus('error');
                return;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            const differenceInMs = end - start;
            const differenceInHours = differenceInMs / (1000 * 60 * 60);

            if (differenceInHours < 48) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes seleccionar más de 48 horas y fechas correctas.'
                });
                setFetchStatus('error');
                return;
            }

            const res = await fetch(`http://localhost:8080/api/producto/disponibilidad/fechainicial/${startDate}/fechafinal/${endDate}?busqueda=${nombreBusqueda}`);

            if (!res.ok) {
                if (res.status === 404 || res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Producto no encontrado.'
                    });
                    setFetchStatus('error');
                } else {
                    throw new Error('La solicitud no fue exitosa');
                }
            } else {
                const jsonData = await res.json();
                if (jsonData.length === 0) {
                    setResultados([]);
                } else {
                    setResultados(jsonData);
                    updateProductos(jsonData);
                }
                setFetchStatus('success');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
            setFetchStatus('error');
        }
    };

    return (
        <div className="autocomplete-container" ref={node}>
            <input
                className='input-buscador'
                type="text"
                placeholder="Escribe el nombre de la maquinaria..."
                value={nombreBusqueda}
                onChange={handleChange}
            />
            {filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => setNombreBusqueda(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div className='bucador-inputs'>
                <input
                    className='input-buscador'
                    type="text"
                    placeholder={`Fecha inicial: ${startDate ? startDate : 'Not selected'} | Fecha Final: ${endDate ? endDate : 'Not selected'}`}
                    onChange={(e) => setFechaBusqueda(e.target.value)}
                />
                <div onClick={toggleCalendario} className='bucador-inputs' style={{ cursor: 'pointer' }} >
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                </div>
            </div>
            <button
                className='btn-buscar'
                onClick={fetchData}
            >
                Buscar
            </button>

            {fetchStatus === 'success' && resultados.length > 0 && <p>Productos encontrados: {resultados.length}</p>}
            {fetchStatus === 'error' && <p>Error al realizar la búsqueda.</p>}
            {mostrarCalendario && <Calendario onChange={handleDateChange} />} {/* Muestra el componente de Calendario si mostrarCalendario es true */}
        </div>
    );
};

export default Buscador;