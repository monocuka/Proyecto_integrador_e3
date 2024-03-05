import { AppRouter } from './router/AppRouter';
import './App.css'
import Buscador from './components/Buscador'
import Categorias from './components/Categorias';
import Card from './components/Card';

export const App = () => {
  return (
    <>
      <Categorias />
      <Buscador />
      <AppRouter />
      <Card />
    </>
  )
}


