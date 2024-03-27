import axios from 'axios';

const obtenerProductosPorCategoria = async (categoriaId) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/producto/categoria/${categoriaId}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener productos por categoría: ' + error.message);
  }
};

export default obtenerProductosPorCategoria;
