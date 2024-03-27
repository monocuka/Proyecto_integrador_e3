import React from 'react';
import { useParams } from 'react-router-dom';
import ListarPorCategoria from './ListarPorCategoria';

const ProductosPorCategoriaPage = () => {
  let { categoriaId } = useParams();
  console.log(categoriaId)

  return (
    <div>
      <ListarPorCategoria categoriaId={categoriaId} />
    </div>
  );
};

export default ProductosPorCategoriaPage;
