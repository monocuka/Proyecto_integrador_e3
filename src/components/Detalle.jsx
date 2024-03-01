
import React from "react";
import '../assets/css/detalle.css'

const Detalle = () => {
    return (
        <div className="detalle-container">
            <div className="header">
            <h2>Título del Producto</h2>
            
            </div>
    
        
            <div className="body">
            
            <p>{/* Texto descriptivo del producto*/}</p>
            </div>
            <div>
            <span className="back-arrow">←</span>
            </div>
        </div>
        );
    };

export default Detalle;