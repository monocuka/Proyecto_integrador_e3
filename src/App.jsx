import { AppRouter } from './router/AppRouter';
import './App.css'
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


