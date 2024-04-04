import React from "react";
import Calendar from 'react-calendar';

const CalendarioExtendido = ({ value, ...props }) => {
    const [startDate, endDate] = value;

    const tileClassName = ({ date, view }) => {
        if (view !== 'month') {
            return;
        }
        const minDate = startDate < endDate ? startDate : endDate;
        const maxDate = startDate > endDate ? startDate : endDate;
        if (
            (minDate && date >= minDate) &&
            (maxDate && date <= maxDate)
        ) {
            return 'highlight';
        }
    };
    return <Calendar {...props} tileClassName={tileClassName} />;
};

export default CalendarioExtendido;
