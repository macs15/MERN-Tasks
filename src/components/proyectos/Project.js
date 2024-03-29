import React from 'react'
import { useProject } from '../../context/proyectos/projectState'
import { useTask } from '../../context/tareas/taskState'


const Project = ({ project }) => {
  const { proyectoActual, proyecto: currentProject } = useProject()
  const { getTasks } = useTask()
  const isActive = currentProject?._id === project._id ? 'active-project' : ''

  const seleccionarProyecto = id => {
    proyectoActual(id)
    getTasks(id)
  }

  return (
    <li title={project.nombre} className={`${isActive} project`}>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(project._id)}
      >
        {project.nombre}</button>
    </li>
  )
}

export default Project
