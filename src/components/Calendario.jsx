import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const siguienteMes = new Date(startDate);
    siguienteMes.setMonth(siguienteMes.getMonth() + 1);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const marcarFechasSeleccionadas = ({ date }) => {
        if (reserva) {
            for (let i = 0; i < reserva.length; i++) {
                const fecha_desde = new Date(reserva[i].fecha_desde[0], reserva[i].fecha_desde[1] - 1, reserva[i].fecha_desde[2]);
                const fecha_hasta = new Date(reserva[i].fecha_hasta[0], reserva[i].fecha_hasta[1] - 1, reserva[i].fecha_hasta[2]);
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
            </div>
            <div className="mes">
                <h3>{nombreMes(startDate.getMonth())} {startDate.getFullYear()}</h3>
                <Calendar
                    onChange={handleStartDateChange}
                    value={startDate}
                    calendarType="gregory"
                    showNavigation={true}
                    tileContent={marcarFechasSeleccionadas}
                    minDetail="year"
                    minDate={new Date()}
                />
            </div>
            <div className="mes">
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={handleEndDateChange}
                    value={endDate}
                    calendarType="gregory"
                    showNavigation={true}
                    tileContent={marcarFechasSeleccionadas}
                    minDetail="year"
                    minDate={new Date()}
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
