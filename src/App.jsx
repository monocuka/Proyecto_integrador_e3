import { AppRouter } from './router/AppRouter';
import './App.css'
//import Buscador from './components/Buscador'
import Categorias from './components/Categorias';
import Card from './components/Card';
import Footer from './components/Footer.jsx';

export const App = () => {
  return (
    <>
      <AppRouter />
      <Card />
      <Footer />
    </>
  )
}


