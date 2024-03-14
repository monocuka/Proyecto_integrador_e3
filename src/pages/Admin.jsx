import '../assets/css/admin.css';
import '../assets/css/panelAdmin.css'
import PanelAdmin from '../components/PanelAdmin';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario || usuario.roles[0].nombreRol !== 'ROLE_ADMIN') {
            navigate('/home');
        }
    }, []); 
    
    return (
        <div className='img-fondo'>
            <PanelAdmin/> 
        </div>
    )
}


  