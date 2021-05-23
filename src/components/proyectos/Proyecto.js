import React from 'react'
import { useProject } from '../../context/proyectos/projectState'
import { useTask } from '../../context/tareas/taskState'


const Proyecto = ({ proyecto }) => {
  const { proyectoActual, proyecto: currentProject } = useProject()
  const { getTasks } = useTask()
  const isActive = currentProject?._id === proyecto._id ? 'active-project' : ''

  const seleccionarProyecto = id => {
    proyectoActual(id)
    getTasks(id)
  }

  return (
    <li className={`${isActive} project`}>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}</button>
    </li>
  )
}

export default Proyecto
