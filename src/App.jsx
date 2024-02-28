import { AppRouter } from './router/AppRouter';
import './App.css'
import Buscador from './components/Buscador'
import Categorias from './components/Categorias';

export const App = () => {
  return (
    <>
      <AppRouter />
      <Buscador />
      <Categorias />
    </>
  )
}

