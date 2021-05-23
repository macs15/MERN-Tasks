import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({ tarea }) => {
  const { proyecto } = useContext(proyectoContext)
  const { eliminarTarea, getTasks, actualizarTarea, guardarTareaActual, limpiarTarea } = useContext(tareaContext)

  // Funcion que se ejecuta cuando el user clickea el btn eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyecto._id)
    getTasks(proyecto.id)
    limpiarTarea()
  }

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false
    } else {
      tarea.estado = true
    }
    actualizarTarea(tarea)
  }

  // Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea)
  }


  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {(tarea.estado)
          ?
          (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >Completo</button>
          )
          :
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >Incompleto</button>
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >Editar</button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >Eliminar</button>
      </div>
    </li>
  )
}

export default Tarea
