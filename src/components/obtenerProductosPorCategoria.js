import axios from 'axios';
import serverEndPoint from './constans';

const obtenerProductosPorCategoria = async (categoriaId) => {
  try {
    const res = await axios.get(`${serverEndPoint}/api/producto/categoria/${categoriaId}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener productos por categoría: ' + error.message);
  }
};

export default obtenerProductosPorCategoria;
