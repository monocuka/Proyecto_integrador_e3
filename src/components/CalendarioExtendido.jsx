import React from "react";
import Calendar from 'react-calendar';

const CalendarioExtendido = ({ value, ...props }) => {
    const [startDate, endDate] = value;

    const tileClassName = ({ date, view }) => {
        if (view !== 'month') {
            return;
        }
        if (
            (startDate && date >= startDate) &&
            (endDate && date <= endDate)
        ) {
            return 'highlight';
        }
    };
    return <Calendar {...props} tileClassName={tileClassName} />;
};

export default CalendarioExtendido;
