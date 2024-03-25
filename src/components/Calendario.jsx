import React from 'react';
import "../assets/css/Calendario.css";

const Calendario = () => {
    // Función para generar los días de un mes dado
    const generarDiasMes = (nombreMes, dias) => {
        return (
            <div className="mes">
                <h2>{nombreMes}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Domingo</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miércoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sábado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aquí puedes generar dinámicamente los días del mes */}
                        {/* Por ejemplo, podrías utilizar un bucle para generar las filas y las celdas */}
                        {/* Ten en cuenta la cantidad de días del mes y qué día de la semana comienza */}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="calendario">
            {generarDiasMes("Marzo", 31)}
            {generarDiasMes("Abril", 30)}
        </div>
    );
};

export default Calendario;
