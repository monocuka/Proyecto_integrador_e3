import React from 'react';

const Categorias = ({ onSelectCategoria }) => {
    const categorias = [
        { id: 1, nombre: 'Categoria 1' },
        { id: 2, nombre: 'Categoria 2' },
        { id: 3, nombre: 'Categoria 3' },
        { id: 4, nombre: 'Categoria 4' },
        { id: 5, nombre: 'Categoria 5' },
        
    ];

    return (
        <div className="categorias">
            <select className="lista categorias" onChange={(e) => onSelectCategoria(e.target.value)}>
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Categorias;