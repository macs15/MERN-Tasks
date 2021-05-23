import React, { useContext, useEffect } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import alertaContext from '../../context/alertas/alertaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {
  const { mostrarAlerta, alerta } = useContext(alertaContext)
  const { proyecto, eliminarProyecto } = useContext(proyectoContext)
  const { tareasproyecto, errorMessage } = useContext(tareaContext)

  useEffect(() => {
    if (errorMessage) {
      mostrarAlerta(errorMessage.msg, errorMessage.categoria)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage])

  if (!proyecto) return <h2 className="titulo">Seleccione un proyecto</h2>

  const onClickEliminar = () => {
    eliminarProyecto(proyecto._id)
  }

  return (
    <>
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
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
                  key={tarea._id}
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


    </>
  )
}

export default ListadoTareas
