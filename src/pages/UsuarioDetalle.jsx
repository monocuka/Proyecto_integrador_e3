import '../assets/css/usuarioDetalle.css';
import '../pages/RegistrarUsuario';

export const UsuarioDetalle = () => {
    return (
        <div>     
            <h2 className='h2usuarioDetalle'>Hola formData.Name </h2>
            <div >
                <div className="company-image">
                    <div className='img-agregar'>
                        <img src='/src/assets/img/foto registrar.png' alt="Imagen de la empresa" />
                    </div>
                    <div className='img-agregar-tablet'>
                        <img id='imgtablet' src='/src/assets/img/foto fondo.png' alt="Imagen de la empresa" />
                    </div>
                </div>
                    
            </div>
        </div>
    )
}