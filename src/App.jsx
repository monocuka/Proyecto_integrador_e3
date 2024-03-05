import { AppRouter } from './router/AppRouter';
import './App.css'
import Categorias from './components/Categorias';
import Recommended from './components/Card_recommended/Recommended';
import Footer from './components/Footer';

export const App = () => {
  return (
    <>
      <AppRouter />
      {/* <Categorias /> */}
      <Footer/>
    </>
  )
}

