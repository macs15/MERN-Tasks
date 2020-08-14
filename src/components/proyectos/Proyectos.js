import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import Barra from '../layout/Barra';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';



const Proyectos = () => {

    // Extraer la informacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="contenedor-app">
            
            <Sidebar />

            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tares">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;