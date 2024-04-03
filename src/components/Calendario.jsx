import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';


//import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange }) => {
    const [date, setDate] = useState(new Date());
    console.log("[calendario.jsx] La reserva q llego es esta: " + reserva)
    const siguienteMes = new Date(date);
    siguienteMes.setMonth(siguienteMes.getMonth() + 1);

    const marcarFechasSeleccionadas = ({ date }) => {
        if (reserva && reserva.reservas) {
            for (let i = 0; i < reserva.reservas.length; i++) {
                const fecha_desde = new Date(reserva.reservas[i].fechaDesde[0], reserva.reservas[i].fechaDesde[1] - 1, reserva.reservas[i].fechaDesde[2]);
                const fecha_hasta = new Date(reserva.reservas[i].fechaHasta[0], reserva.reservas[i].fechaHasta[1] - 1, reserva.reservas[i].fechaHasta[2]);
                if (date.getMonth() === fecha_desde.getMonth() && date.getFullYear() === fecha_desde.getFullYear()) {
                    if (date.getDate() >= fecha_desde.getDate() && date.getDate() <= fecha_hasta.getDate()) {
                        return <div className="selected-date">❌</div>;
                    }
                }
            }
        }
    };


    const marcarFechasSeleccionadas1 = ({ date }) => {
        if (reserva && reserva.reservas) {
            for (let i = 0; i < reserva.reservas.length; i++) {
                const fecha_desde = new Date(reserva.reservas[i].fechaDesde[0], reserva.reservas[i].fechaDesde[1] - 1, reserva.reservas[i].fechaDesde[2]);
                const fecha_hasta = new Date(reserva.reservas[i].fechaHasta[0], reserva.reservas[i].fechaHasta[1] - 1, reserva.reservas[i].fechaHasta[2]);

                if (date.getMonth() === fecha_desde.getMonth() && date.getFullYear() === fecha_desde.getFullYear()) {
                    if (date.getDate() >= fecha_desde.getDate() && date.getDate() <= fecha_hasta.getDate()) {
                        return <div className="selected-date">❌</div>;
                    }
                }
            }
        }
    };

    return (
        <div className="cal-container">
            <div className="title-container">
                <h2>Calendario</h2>
                <div></div>
                <h1></h1>
            </div>
            <div className="mes">
                <h3>{nombreMes(date.getMonth())} {date.getFullYear()}</h3>
                <Calendar
                    onChange={onChange}
                    value={date}
                    calendarType="gregory"
                    showNavigation={true}
                    tileContent={marcarFechasSeleccionadas}
                    minDetail="year"
                    minDate={new  Date()}
                />
            </div>
            <div className="mes">
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={onChange}
                    value={siguienteMes}
                    calendarType="gregory"
                    showNavigation={true}
                    tileContent={marcarFechasSeleccionadas1}
                    minDetail="year"
                    minDate={new  Date()}
                />
            </div>
        </div>
    );
};

const nombreMes = (mes) => {
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return nombresMeses[mes];
};

export default Calendario;
