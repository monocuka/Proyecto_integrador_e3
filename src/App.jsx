import { AppRouter } from './router/AppRouter';
import './App.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import Card from './components/Card';
import Footer from './components/Footer.jsx';

export const App = () => {
  return (
    <>
    <AuthProvider>
      <AppRouter />
      <Card />
      <Footer />
    </AuthProvider>
    </>
  )
}


