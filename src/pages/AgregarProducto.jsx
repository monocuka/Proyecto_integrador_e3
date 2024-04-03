import { RegistrarProducto } from '../components/RegistrarProducto.jsx'

export const AgregarProducto = () => {
  
    return (
      <>
        <div className='espacio-menu-header' />
        <div>
          <h1 className='titulo-modificar-producto'>Crear Producto</h1>
        </div>
        <RegistrarProducto/>
        <div className='espacio-menu-footer' />
      </>
    )
}
  