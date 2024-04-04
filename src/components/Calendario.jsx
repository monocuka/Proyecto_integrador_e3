import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calendario.css';

//import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendario.css';

const Calendario = ({ reserva, onChange, startDate, endDate }) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [date, setDate] = useState(new Date());
    const [ fechasDeshabilitadas, setFechasDeshabilitadas] = useState([]);    if(startDate == null || endDate == null){
        
        startDate = date;
        endDate = date;
    }
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
                <h3>{nombreMes(siguienteMes.getMonth())} {siguienteMes.getFullYear()}</h3>
                <Calendar
                    onChange={handleDateChange}
                    value={[adjustedStartDate, adjustedEndDate]}
                    calendarType="gregory"
                    showNavigation={false}
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

