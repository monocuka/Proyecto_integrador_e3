
import { PropTypes } from 'prop-types';

export const Button = ({ texto, onclick, ancho, alto,  transparente}) => {
  
    const estilo = {
        backgroundColor: transparente ? 'transparent' : '#DE8121', /* transparente o fondo naranja */
        color: transparente ? '#DE8121' : '#FFFFFF', /* Texto blanco */
        border: '2px solid #DE8121', /* Borde naranja */
        borderRadius: '5px', /* Esquinas redondeadas */
        padding: '10px 15px', /* Espaciado interno */
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', /* Sombra */
        fontSize: '16px', /* Tamaño de letra */
        cursor: 'pointer', /* Cambia el cursor al pasar el ratón */
        marginRight: '10px',
        width: `${ancho}px`,  // Ancho del botón
        height: `${alto}px`,  // Alto del botón
    };

    return (
        <button onClick={ onclick } style={ estilo }>
            {texto}
        </button>
    )
}

Boton.defaultProps = {
    onClick: () => {},
    ancho: 100,
    alto: 50,
    transparente: false,
};
  
Boton.propTypes = {
    texto: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    ancho: PropTypes.number,
    alto: PropTypes.number,
    transparente: PropTypes.bool
};