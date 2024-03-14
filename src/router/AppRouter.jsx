import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from '../pages/Home.jsx';
import { Admin } from '../pages/Admin';
import { AgregarProducto } from '../pages/AgregarProducto';
import { Header } from '../components/Header';
import { Detalle } from '../pages/Detalle.jsx'
import ListarProducto from "../components/ListarProdcuto";
import EditarProducto from "../pages/EditarProducto";
import { AgregarCategoria } from "../components/AgregarCategoria";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/home" element={ <Home  /> } />
          <Route path="/" element={ <Navigate to="/home" /> } />
          <Route path="/admin" element={ <Admin /> } />
          <Route path="/agregarProducto" element={ <AgregarProducto /> } />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/listarProducto" element={ <ListarProducto /> } />
          <Route path="/editarProducto" element={ <EditarProducto/> }/>
          <Route path="/agregarCategoria" element={ <AgregarCategoria/> }/>
      </Routes>
    </>
  )
}


