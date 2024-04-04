import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';


//import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange }) => {
    const [date, setDate] = useState(new Date());

    const siguienteMes = new Date(date);
    siguienteMes.setMonth(siguienteMes.getMonth() + 1);

    console.log(reserva?.reservas);
    
    const disabledDates = [
        new Date(2024, 3, 10), 
        new Date(2024, 3, 11),
    ];


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
                    // tileContent={marcarFechasSeleccionadas}
                    minDetail="year"
                    minDate={new  Date()}
                    tileDisabled={({ date, view }) => {
                        return view === 'month' && disabledDates.some(disabledDate => {
                            return date.getTime() === disabledDate.getTime();
                        })}
                    }
                />
            </div>
            <div className="mes">
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={onChange}
                    value={siguienteMes}
                    calendarType="gregory"
                    showNavigation={true}
                    // tileContent={marcarFechasSeleccionadas1}
                    minDetail="year"
                    minDate={new  Date()}
                    tileDisabled={({ date, view }) => {
                        return view === 'month' && disabledDates.some(disabledDate => {
                            return date.getTime() === disabledDate.getTime();
                        })}
                    }
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

