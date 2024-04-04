import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

//import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange }) => {
    const [date, setDate] = useState(new Date());
    const [ fechasDeshabilitadas, setFechasDeshabilitadas] = useState([]);
    const siguienteMes = new Date(date);
    siguienteMes.setMonth(siguienteMes.getMonth() + 1);


    const generarRangoFechas = (fechaDesde, fechaHasta) => {
        let disabledDates = [];
    
        const dateDesde = new Date(fechaDesde[0], fechaDesde[1] - 1, fechaDesde[2]);
        const dateHasta = new Date(fechaHasta[0], fechaHasta[1] - 1, fechaHasta[2]);
    
        for (let date = new Date(dateDesde); date <= dateHasta; date.setDate(date.getDate() + 1)) {
            disabledDates.push(new Date(date));
        }
    
        return disabledDates;
    }
    
    useEffect(() =>{
        if (reserva) {
            let deshabilitarFechas = [];

            reserva.reservas.forEach(item => {
                const disabledDates = generarRangoFechas(item.fechaDesde, item.fechaHasta);
                deshabilitarFechas = [...deshabilitarFechas, ...disabledDates];
            });

            setFechasDeshabilitadas(deshabilitarFechas);
        }
    }, [reserva]);

    return (
        <div className="cal-container">
            <div className="title-container">
                <h2>Calendario</h2>
            </div>
            <div className="mes">
                
                <Calendar
                    onChange={onChange}
                    value={startDate}
                    calendarType="gregory"
                    showNavigation={true}
                    minDetail="year"
                    minDate={new  Date()}
                    tileDisabled={({ date, view }) => {
                        return view === 'month' && fechasDeshabilitadas.some(disabledDate => {
                            return date.getTime() === disabledDate.getTime();
                        })}
                    }
                />
            </div>
            <div className="mes">
                
                <Calendar
                    onChange={onChange}
                    value={endDate}
                    calendarType="gregory"
                    showNavigation={true}
                    minDetail="year"
                    minDate={new  Date()}
                    tileDisabled={({ date, view }) => {
                        return view === 'month' && fechasDeshabilitadas.some(disabledDate => {
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

