import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';
//import 'react-calendar/dist/Calendar.css';

const Calendario = () => {
    const [date, setDate] = useState(new Date());

    const siguienteMes = new Date(date);
    siguienteMes.setMonth(siguienteMes.getMonth() + 1);

    const onChange = (date) => {
        setDate(date);
    };

    const marcarFechasSeleccionadas = ({ date }) => {
        if (date.getDate() <= 5) {
            return <div className="selected-date">❌</div>;
        }
    };

    const marcarFechasSeleccionadas1 = ({ date }) => {
        if (date.getDate() <= 10) {
            return <div className="selected-date">❌</div>;
        }
    };

    return (
        <div className="cal-container">
            <div className="title-container">
                <h2>Calendario</h2>
                <div></div>
                <h3><div className="selected-date">❌Días No disponibles</div></h3>
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
                />
            </div>
            <div className="mes">
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={() => {}}
                    value={siguienteMes}
                    calendarType="gregory"
                    showNavigation={true}
                    tileContent={marcarFechasSeleccionadas1}
                    minDetail="year"
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
