import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

     // obtener la funcion del context de tarea
     const tareasContext = useContext(tareaContext);
     const { tareaseleccionada ,errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // effect que detecta si hay una tarea selccionada
    useEffect( () => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

   // extraer el nombre del proyecto
   const { nombre } = tarea;

    // si hay hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

     // Leer los valores del formulario
     const handleChange = e => {
        guardarTarea({
            ...guardarTarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }

        // pasar la validación

        // agregar o editar una tarea
        if(tareaseleccionada === null) {
            // agregar la nueva tarea al state tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizamos la tarea editada
            actualizarTarea(tarea);

            // Limpia tareaseleccionada del state
            limpiarTarea();
        }
        
        // obtener y filtrar las tareas del proyecto
        obtenerTareas(proyectoActual._id);

        // reiniciar el form
        guardarTarea({
            nombre:''
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;