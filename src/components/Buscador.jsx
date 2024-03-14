import React, { useState, useEffect } from 'react';
import './../styles/buscador.css';

const Buscador = () => {
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:8080/api/buscarNombre/{nombre}/`);
            if (!res.ok) {
              throw new Error('La solicitud no fue exitosa');
            }
            const jsonData = await res.json();
            setResultados(jsonData);
            setError(null); // Limpiar error si la solicitud es exitosa
          } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Guardar el mensaje de error
          }
        };
    
        fetchData();
      }, [busqueda]);

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
    };

    return (
        <div className="buscador-input">
            <input 
                className='input-buscador' 
                type="text" 
                placeholder="Escribe el nombre de la maquinaria.." 
                value={busqueda}
                onChange={handleInputChange}
            />
            <button 
                className='btn-buscar'
            >
                Buscar
            </button>

            {error && <p className="error-message">Error: {error}</p>}
        </div>
    );
};

export default Buscador;
