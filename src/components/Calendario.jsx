import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';


//import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange, startDate, endDate }) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [date, setDate] = useState(new Date());
    if(startDate == null || endDate == null){
        
        startDate = date;
        endDate = date;
    }
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

    const incrementMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
        setSiguienteMes(new Date(siguienteMes.getFullYear(), siguienteMes.getMonth() + 1));
    };

    const decrementMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
        setSiguienteMes(new Date(siguienteMes.getFullYear(), siguienteMes.getMonth() - 1));
    };

    const handleDateChange = (date) => {
        onChange(date);
        const formattedDate = date.toISOString().split('T')[0];
        if (!start) {
            setStart(formattedDate);
        } else if (!end) {
            setEnd(formattedDate); 
        } else {
            setStart(formattedDate);
            setEnd(null);
        }
    };
    

    const adjustedEndDate = end ? new Date(new Date(end).setDate(new Date(end).getDate() + 1)) : null;
    const adjustedStartDate = start ? new Date(new Date(start).setDate(new Date(start).getDate() + 1)) : null;

    return (
        <div className="cal-container">
            <div className="title-container">
                <h2>Calendario</h2>
                <button className='cal-btn' onClick={decrementMonth}>Previous</button>
                <button className='cal-btn' onClick={incrementMonth}>Next</button>
                <div></div>
                <h1></h1>
            </div>
            <div className="mes">
                <h3>{nombreMes(date.getMonth())} {date.getFullYear()}</h3>
                <Calendar
                    onChange={handleDateChange}
                    value={[adjustedStartDate, adjustedEndDate]}
                    calendarType="gregory"
                    showNavigation={false}
                    tileContent={marcarFechasSeleccionadas}
                    minDetail="year"
                    minDate={new  Date()}
                />
            </div>
            <div className="mes">
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={handleDateChange}
                    value={siguienteMes}
                    calendarType="gregory"
                    showNavigation={false}
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