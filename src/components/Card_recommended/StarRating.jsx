import React from 'react'
import './../../assets/css/Card_recommendad.css'

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<span key={i}>&#9733;</span>); // Estrella llena
        } else {
            stars.push(<span key={i}>&#9734;</span>); // Estrella vacía
        }
    }
    return <div className='stars'>{stars}</div>;
};

export default StarRating