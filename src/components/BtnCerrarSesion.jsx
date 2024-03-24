import React from "react";
import '../assets/css/card.css'

export const BtnCerrarSesion = () => {
    function eliminarUsuarioDelLocalStorage() {
        localStorage.removeItem('usuario');
    }
    return (
        <button onClick={eliminarUsuarioDelLocalStorage} className="btnDetail">Logout</button>
    )
};