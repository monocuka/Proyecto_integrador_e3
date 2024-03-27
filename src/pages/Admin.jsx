import '../assets/css/admin.css';
import '../assets/css/panelAdmin.css'
import PanelAdmin from '../components/PanelAdmin';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
        
    return (
        <div className='img-fondo'>
            <PanelAdmin/> 
        </div>
    )
}


  