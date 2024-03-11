import React from 'react';
import '../assets/css/buscador.css'

const Buscador = () => {
    return (
        <div className="buscador">
            <h1 className="titulo-grande">Encuentra de forma facil tus herramientas</h1>
            <h2 className="titulo">Motoniveladoras, retroescabadoras, tractores, topadores y muchas más herramientas</h2>
            <input type="text" placeholder="Que herramienta buscas?" />
        </div>
    );
};

export default Buscador;