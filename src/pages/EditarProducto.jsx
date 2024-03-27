// import ProductoEditar from '../components/ProductoEditar'
import { FormEditarProducto } from '../components/FormEditarProducto';
import { useParams } from 'react-router-dom';
import '../assets/css/formEditarArchivo.css'

export const EditarProducto = () => {
  const { id } = useParams();

  return (
    // <ProductoEditar />
    <FormEditarProducto id={ id }/>
  )
}