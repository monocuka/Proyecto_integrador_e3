import React from 'react';
import './../styles/buscador.css'

const Buscador = () => {
    return (
        <div className="buscador-input">
            <input className='input-buscador' type="text" placeholder="Escribe le nombre de la maquinaria..." />
            <button className='btn-buscar'>Buscar</button>
        </div>
    );
};

export default Buscador;