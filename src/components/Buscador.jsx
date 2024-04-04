import React, { useState, useEffect, useRef  } from 'react';
import '../assets/css/buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Calendario from './Calendario'; // Importa tu componente de Calendario
import 'react-calendar/dist/Calendar.css';
import serverEndPoint from './constans';

const Buscador = ({ updateProductos }) => {
  const [nombreBusqueda, setNombreBusqueda] = useState('');
    const [fechaBusqueda, setFechaBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar la visibilidad del componente de Calendario
    const node = useRef();
  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const fetchData = async () => {
      setFetchStatus('loading');
      try {
        
        if(startDate === null || endDate === null) {
          setError("Debe completar las fechas"); // Guardar el mensaje de error
          setFetchStatus('error');
          return;
        }
        console.log
        
        const res = await fetch(`${serverEndPoint}/api/producto/disponibilidad/fechainicial/${startDate}/fechafinal/${endDate}?busqueda=${nombreBusqueda}`);
        
        if (!res.ok) {
          if (res.status === 404 || res.status === 500) {
            setError('Product not found');
            setFetchStatus('error');
          } else {
            throw new Error('La solicitud no fue exitosa');
          }
        } else {
          const jsonData = await res.json();
          if (jsonData.length === 0) { // Check if the array is empty
            setError('No results found');
          } else {
            setResultados(jsonData);
            updateProductos(jsonData);
            setError(null); // Limpiar error si la solicitud es exitosa
          }
          setFetchStatus('success');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message); // Guardar el mensaje de error
        setFetchStatus('error');
      }
    };
  //_________
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
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

  const handleFechaInputChange = (event) => {
    setFechaBusqueda(event.target.value);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setNombreBusqueda(value);

    try {
        const response = await fetch(`${serverEndPoint}/api/producto/nombresSimilares/${value}`);
        const data = await response.json();
        setFilteredSuggestions(data);
        
        if (Array.isArray(data)) {
          setFilteredSuggestions(data.map(item => item.nombre));
        
        } else {
          setFilteredSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const handleSelect = (value) => {
    setNombreBusqueda(value);
    setFilteredSuggestions([]);
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

  return (
    <div className="autocomplete-container"  ref={node}>
      <div className='container-inputs'>
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
                    <li key={index} onClick={() => handleSelect(suggestion)}>
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
            onChange={handleFechaInputChange}
          />
          <div onClick={toggleCalendario} className='icono-calendario'  style={{ cursor: 'pointer' }} >
            <FontAwesomeIcon icon={faCalendarAlt}  size="2x"/>
          </div>
          <button className='btn-buscar' onClick={fetchData}>
            Buscar
          </button>
      </div>
      </div>

      {fetchStatus === 'success' && resultados != null && resultados.length > 0 && <p>Productos encontrados: {resultados.length}</p>}
      {fetchStatus === 'error' && <p>Error: {error}</p>}
      {mostrarCalendario && <Calendario onChange={handleDateChange} />} {/* Muestra el componente de Calendario si mostrarCalendario es true */}
    </div>
  );
};

export default Buscador;