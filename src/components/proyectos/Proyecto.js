import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const Proyecto = ({ proyecto }) => {
  const { proyectoActual, proyecto: currentProject } = useContext(proyectoContext)
  const { getTasks } = useContext(tareaContext)
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
