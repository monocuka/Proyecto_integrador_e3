import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from '../pages/Home.jsx';
import { Admin } from '../pages/Admin';
import { AgregarProducto } from '../pages/AgregarProducto';
import { Header } from '../components/Header';
import IniciarSesion from '../pages/IniciarSesion'

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/home" element={ <Home  /> } />
          <Route path="/" element={ <Navigate to="/home" /> } />
          <Route path="/admin" element={ <Admin /> } />
          <Route path="/agregarProducto" element={ <AgregarProducto /> } />
          <Route path="/iniciarSesion" element={ <IniciarSesion /> } />
          
      </Routes>
    </>
  )
}
