import React, { useState, useEffect } from 'react';
import '../assets/css/buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Calendario from './Calendario'; // Importa tu componente de Calendario
import 'react-calendar/dist/Calendar.css';

const Buscador = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [fechaBusqueda, setFechaBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar la visibilidad del componente de Calendario
  const [startDate, setStartDate] = useState(null); //fecha inicial 
  const [endDate, setEndDate] = useState(null); //fecha final
  const [busqueda, setBusqueda] = useState('');

  const fetchData = async () => {
    setFetchStatus('loading');
    try {
      const res = await fetch(`http://localhost:8080/api/producto/disponibilidad/fechainicial/${startDate}/fechafinal/${endDate}?busqueda=${nombreBusqueda}`);
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
  const onChange = (date) => {
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

  const handleNombreInputChange = (event) => {
    setNombreBusqueda(event.target.value);
  };

  const handleFechaInputChange = (event) => {
    setFechaBusqueda(event.target.value);
  };

  return (
    <div className="buscador-input">
      <input 
        className='input-buscador' 
        type="text" 
        placeholder="Escribe el nombre de la maquinaria..." 
        value={nombreBusqueda}
        onChange={handleNombreInputChange}
      />
      <div>
        <input 
          className='input-buscador' 
          type="text" 
          placeholder={`Fecha inicial: ${startDate ? startDate : 'Not selected'} | Fecha Final: ${endDate ? endDate : 'Not selected'}`}
          onChange={onChange}
        />
        <div onClick={toggleCalendario}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
    </div>
      <button 
        className='btn-buscar'
        onClick={fetchData}
      >
        Buscar
      </button>

      {fetchStatus === 'success' && resultados != null && resultados.length > 0 && <p>Productos encontrados: {resultados.map(resultado => resultado.nombre).join(', ')}</p>}
      {fetchStatus === 'error' && <p>Error: {error}</p>}
      {mostrarCalendario && <Calendario onChange={onChange} />} {/* Muestra el componente de Calendario si mostrarCalendario es true */}
    </div>
  );
};

export default Buscador;
