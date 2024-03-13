import { AppRouter } from './router/AppRouter';
import './App.css'
import Categorias from './components/Categorias';
import { RegistrarProducto } from './components/RegistrarProducto.jsx';

export const App = () => {
  return (
    <>
      <AppRouter />
      {/* <Buscador /> */}
      <Categorias />
      <RegistrarProducto />
    </>
  )
}

