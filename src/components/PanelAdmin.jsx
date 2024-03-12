import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/panelAdmin.css'

const PanelAdmin = () => {
  return (
    <div className='btn-panel'>
        <Link to="/agregarProducto" className='btn-panel-admin'>Agregar producto</Link>
        <Link to="/editarProducto" className='btn-panel-admin'>Editar producto</Link>
        <Link to="/agregarCategoria" className='btn-panel-admin'>Agregar Categoria</Link>
        <Link to="/listarProducto" className='btn-panel-admin'>Listar producto</Link>
    </div>
  )
}

export default PanelAdmin