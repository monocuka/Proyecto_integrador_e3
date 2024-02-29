import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from '../pages/Home';
import { Admin } from '../pages/Admin';
import { AgregarProducto } from '../pages/AgregarProducto';
import { Header } from '../components/Header';

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/home" element={ <Home  /> } />
          <Route path="/" element={ <Navigate to="/home" /> } />
          <Route path="/admin" element={ <Admin /> } />
          <Route path="/agregarProducto" element={ <AgregarProducto /> } />
      </Routes>
    </>
  )
}