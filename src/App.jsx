import { AppRouter } from './router/AppRouter';
import './App.css'
import Footer from './components/Footer.jsx';


export const App = () => {
  return (
    <>
      <AppRouter />
      {/* <Buscador /> */}
      {/* <Categorias /> */}
      {/* <RegistrarProducto /> */}
      <Footer />
    </>
  )
}

