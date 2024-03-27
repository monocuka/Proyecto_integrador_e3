import { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from '../pages/Home.jsx';
import { Admin } from '../pages/Admin';
import { AgregarProducto } from '../pages/AgregarProducto';
import { Header } from '../components/Header.jsx';
import { Detalle } from '../pages/Detalle.jsx'
import ListarProducto from "../components/ListarProducto.jsx";
import EditarProducto from "../pages/EditarProducto";
import { AgregarCategoria } from "../components/AgregarCategoria";
import { IniciarSesion } from '../pages/IniciarSesion';
import { RegistrarUsuario } from "../pages/RegistrarUsuario.jsx";
import { UsuarioDetalle } from "../pages/UsuarioDetalle.jsx";
import { AuthContext } from '../context/AuthContext';


// Componente de alto orden para el layout con encabezado y pie de página
const WithHeaderAndFooter = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/iniciarSesion" element={<IniciarSesion />} />
      <Route path="/registrarUsuario" element={<RegistrarUsuario />} />
      <Route path="/*" element={<WithHeaderAndFooter><AppRoutes /></WithHeaderAndFooter>} />
    </Routes>
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/listarProducto" element={<RoleBasedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}><ListarProducto /></RoleBasedRoute>} /> 
      <Route path="/usuarioDetalle" element={<RoleBasedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}><UsuarioDetalle /></RoleBasedRoute>} /> 
      <Route path="/detalle/:id" element={<RoleBasedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}><Detalle /></RoleBasedRoute>} />
      <Route path="/agregarProducto" element={<RoleBasedRoute allowedRoles={['ROLE_ADMIN']}><AgregarProducto /></RoleBasedRoute>} /> 
      <Route path="/editarProducto" element={<RoleBasedRoute allowedRoles={['ROLE_ADMIN']}><EditarProducto /></RoleBasedRoute>} /> 
      <Route path="/agregarCategoria" element={<RoleBasedRoute allowedRoles={['ROLE_ADMIN']}><AgregarCategoria /></RoleBasedRoute>} /> 
      

    </Routes>
  )
}

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { authState } = useContext(AuthContext);
  const { logged, usuario } = authState;
  
  if (!logged || !allowedRoles.includes(usuario.roles[0].nombreRol)) {
    return <Navigate to="/home" />;
  }

  return (
    <WithHeaderAndFooter>
      {children}
    </WithHeaderAndFooter>
  );
}