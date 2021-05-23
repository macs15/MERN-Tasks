import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext)
  const { proyecto, eliminarProyecto } = proyectosContext
  const tareasContext = useContext(tareaContext)
  const { tareasproyecto } = tareasContext

  if (!proyecto) return <h2 className="titulo">Seleccione un proyecto</h2>

  const onClickEliminar = () => {
    eliminarProyecto(proyecto._id)
  }

  return (
    <Fragment>
      <h2 className="titulo">Proyecto: {proyecto.nombre}</h2>

      <ul className="listado-tareas">
        {(tareasproyecto.length === 0)
          ? (<li className="tarea"><p>No hay tareas</p></li>)
          : <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition
                key={tarea._id}
                timeout={200}
                classNames="tarea"
              >
                <Tarea
                  tarea={tarea}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar sombra"
        onClick={onClickEliminar}
      >Eliminar Proyecto &times;</button>


    </Fragment>
  )
}

export default ListadoTareas
