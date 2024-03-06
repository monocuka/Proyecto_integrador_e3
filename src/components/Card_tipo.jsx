import React from 'react'
import './../assets/css/card_tipo.css'

const Card_tipo = ({ categoria, imageurl }) => {
  
  //const [categoria, setCategoria] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('http://localhost:8080/api/producto/id/');
  //       if (!res.ok) {
  //         throw new Error('La solicitud no fue exitosa');
  //       }
  //       const jsonData = await res.json();
  //       setCategoria(jsonData);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (categoria.length === 0) {
  //   return <div>Cargando...</div>;
  // }
  
  return (
    <div className='container_tipo'>
        <img className='container-tipo-img' src={imageurl} alt="foto" />
        <h3 className='text-tipo'>{categoria}</h3>
    </div>
  );
}

export default Card_tipo