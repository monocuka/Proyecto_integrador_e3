import { AppRouter } from './router/AppRouter';
import './App.css'
import Categorias from './components/Categorias';
import Card from './components/Card';
import IdentificarUsuario from './components/IdentificarUsuario';
import { RegistrarProducto } from './components/RegistrarProducto.jsx';

export const App = () => {
  return (
    <>
      <Categorias />
      <Buscador />
      <AppRouter />
      <Card />
      <IdentificarUsuario/>
      <RegistrarProducto />
    </>
  )
}


