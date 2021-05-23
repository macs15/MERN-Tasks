import React, { useEffect } from 'react'
import Proyecto from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useProject } from '../../context/proyectos/projectState'
import { useAlert } from '../../context/alertas/alertState'

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
        {proyectos.map(proyecto => (
          <CSSTransition
            key={proyecto._id}
            timeout={200}
            classNames="proyecto"
          >
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}

export default ListadoProyectos
