import React, { useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useProject } from '../../context/proyectos/projectState'
import { useAlert } from '../../context/alertas/alertState'
import Project from './Project'

const ListadoProyectos = () => {
  const { mensaje, proyectos, obtenerProyectos } = useProject()
  const { alerta, mostrarAlerta } = useAlert()

  useEffect(() => {
    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

    obtenerProyectos()
    // eslint-disable-next-line
  }, [mensaje])

  if (proyectos.legth === 0) return null

  return (

    <ul className="listado-proyectos">

      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

      <TransitionGroup>
        {proyectos.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="proyecto"
          >
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}

export default ListadoProyectos
