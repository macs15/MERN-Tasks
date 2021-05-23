import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
  const { proyecto } = useContext(proyectoContext)
  const { tareaseleccionada, errortarea, addTask, validarTarea, getTasks, actualizarTarea, limpiarTarea } = useContext(tareaContext)

  // effect que detecta si hay una tarea selccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada)
    } else {
      guardarTarea({
        nombre: ''
      })
    }
  }, [tareaseleccionada])

  const [tarea, guardarTarea] = useState({
    nombre: ''
  })

  const { nombre } = tarea

  if (!proyecto) return null

  const handleChange = e => {
    guardarTarea({
      ...guardarTarea,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    if (nombre.trim() === '') {
      validarTarea()
      return
    }

    if (tareaseleccionada === null) {
      tarea.proyecto = proyecto._id
      addTask(tarea)
    } else {
      actualizarTarea(tarea)
      limpiarTarea()
    }

    getTasks(proyecto._id)

    guardarTarea({
      nombre: ''
    })
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
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  )
}

export default FormTarea
