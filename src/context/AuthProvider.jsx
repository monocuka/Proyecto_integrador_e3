import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';
import serverEndPoint from '../components/constans';

const init = () => {
    const user = JSON.parse( localStorage.getItem('usuario') );
    return { logged: !!user, usuario: user }
}

export const AuthProvider = ({ children }) => {
    const [ authState, dispatch ] = useReducer( authReducer, {}, init );
    
    const login = async (email = '', password = '') => {
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        redirect: "follow"
      };
    
      try {
        const response = await fetch(`${serverEndPoint}/api/auth/authenticate`, requestOptions);
        
        if (response.status === 403) {
          return { logged: false, error: 'Acceso prohibido: las credenciales son incorrectas' };
        }
    
        if (!response.ok) {
          return { logged: false, error: 'Error al realizar la solicitud' };
        }
        
        const result = await response.json();
        localStorage.setItem('usuario', JSON.stringify( result ));
        const action = { type: types.login, payload: result }
        dispatch( action );
        return { logged : true };
      
      } catch (error) {
        
        return { logged: false, error: error }; 

      }

    }

    const logout = () => {
      localStorage.removeItem('usuario');
      const action = { type: types.logout };
      dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
          // Estados
          authState,

          // Metodos
          login,
          logout
        }}>
            { children }
        </AuthContext.Provider>
      );
}