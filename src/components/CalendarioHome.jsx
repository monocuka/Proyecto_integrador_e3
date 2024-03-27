import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/css/CalendarButton.css'; // Import CSS file for styling



export default function CalendarioHome() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalendars, setShowCalendars] = useState(false);

    const toggleCalendars = () => {
        setShowCalendars(!showCalendars);
    };

    const handleSearch = () => {
        // Logic for search
        console.log("Searching between", startDate, "and", endDate);
    };

    return (
        <div>
            <button className='btn-buscar-pro'
                onClick={toggleCalendars}>Fechas</button>
            {showCalendars && (
                <span className="calendars-container">
                    <span className="calendar">
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                        />
                    </span>
                    <span className="calendar">
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                        />
                    </span>
                    <button onClick={handleSearch}>Search</button>
                </span>
            )}
        </div>
    );
}
