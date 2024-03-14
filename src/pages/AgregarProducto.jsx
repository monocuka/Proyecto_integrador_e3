import '../assets/css/agregarProducto.css';
import { RegistrarProducto } from '../components/RegistrarProducto'
import { useNavigate } from 'react-router-dom';
export const AgregarProducto = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario || usuario.roles[0].nombreRol !== 'ROLE_ADMIN') {
            navigate('/home');
        }
    }, []);
    return (
      <RegistrarProducto/>
    )
}
  