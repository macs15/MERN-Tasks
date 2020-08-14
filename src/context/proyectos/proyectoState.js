import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../configs/axios';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    CERRAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types';


const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    } 

    // obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta= {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

       try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto);
           // Insertar el proyecto en el state
           dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
           });
       } catch (error) {
        const alerta= {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }

        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }

    }

    // validar el formulario por error
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // cierra el formulario que agrega un nuevo proyecto
    const cerrarForm = () => {
        dispatch({
            type: CERRAR_FORMULARIO
        })
    }
    // Selecciona el proyecto que es usuario clickea
    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId,
            })
        } catch (error) {
            const alerta= {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }


    // mantener los nombres de states en una palabra toda miniscula
    // y las funciones con dos palabras la segunda palabra con la primera letra mayuscula
    // asi diferenciamos states de funciones
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                cerrarForm,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
    // props.children habilita el flujo de datos entre los componentes
}

export default ProyectoState;


