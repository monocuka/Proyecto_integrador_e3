import '../assets/css/home.css';
import Buscador from '../components/Buscador';
import Recommended from '../components/Card_recommended/Recommended';
import Card_tipo from '../components/Card_tipo';
import './../assets/css/home.css'

export const Home = () => {

  return (
    <>
    <div className='buscador'>
      <h1 className='titulo-buscador'>Encuentra de forma fácil tus herrmientas</h1>
      <p className="parrafo-buscador">Motoniveladoras, retroexcavadoras, tractores topadores y muchos más herramientas.</p>
      <Buscador/>
    </div>
    <h3 className='titulo_tipo background-tittle'>Busqueda por tipo de maquinaria</h3>
    <div className='card-tipo card-recomendado'>
          <Card_tipo/>
          <Card_tipo/>
          <Card_tipo/>
          <Card_tipo/>
    </div>
    <div className="fondo-recomendado">
      <h3 className='titulo_tipo'>Lo más recomendado</h3>
      <div className='card-tipo card-recomendado'>
        <Recommended/>
      </div>
    </div>
    </>
  )
  
}
