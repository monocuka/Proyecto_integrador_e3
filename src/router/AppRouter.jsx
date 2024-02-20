import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from '../pages/Home';
import { Admin } from '../pages/Admin';
import { AgregarProducto } from '../pages/AgregarProducto';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={ <Home  /> } />
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/addProducto" element={ <AgregarProducto /> } />
    </Routes>
  )
}
