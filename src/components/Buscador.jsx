import React, { useState, useEffect } from 'react';
import '../assets/css/buscador.css';

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('idle');


  const fetchData = async () => {
    setFetchStatus('loading');
    try {
      const res = await fetch(`http://localhost:8080/api/producto/buscarNombre/${busqueda}`);
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
  
  useEffect(() => {
    
  }, [resultados]);
  
  

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
            onClick={fetchData}
        >
            Buscar
        </button>

        {/* {error && <p className="error-message">Error: {error}</p>} */}
        {fetchStatus == "success" && resultados != null && resultados.length > 0 && <p>Found products: {resultados.map(resultado => resultado.nombre).join(', ')}</p>}
        {fetchStatus == "error"  && <p>No products found</p>}
    </div>
  );
};

export default Buscador;