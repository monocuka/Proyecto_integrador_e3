import ProductoEditar from '../components/ProductoEditar'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const EditarProducto = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario || usuario.roles[0].nombreRol !== 'ROLE_ADMIN') {
            navigate('/home');
        }
    }, []);
  return (
    <ProductoEditar />
  )
}

export default EditarProducto