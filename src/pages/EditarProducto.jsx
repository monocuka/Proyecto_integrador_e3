import { FormEditarProducto } from '../components/FormEditarProducto';
import { useParams } from 'react-router-dom';
import '../assets/css/formEditarArchivo.css'

export const EditarProducto = () => {
  const { id } = useParams();

  return (
    <>
      <div className='espacio-menu-header' />
      <div>
        <h1 className='titulo-modificar-producto'>Modificar Producto</h1>
      </div>
      <FormEditarProducto id={ id }/>
      <div className='espacio-menu-footer' />
    </>
  )
}