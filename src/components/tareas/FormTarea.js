import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
  const { proyecto } = useContext(proyectoContext)
  const { currentTask, errortarea, addTask, validateTask, getTasks, updateTask } = useContext(tareaContext)

  // effect que detecta si hay una tarea selccionada
  useEffect(() => {
    if (currentTask !== null) {
      guardarTarea(currentTask)
    } else {
      guardarTarea({
        nombre: ''
      })
    }
  }, [currentTask])

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
      validateTask()
      return
    }

    if (currentTask === null) {
      tarea.proyecto = proyecto._id
      addTask(tarea)
      getTasks(proyecto._id)
    } else {
      updateTask({ ...currentTask, nombre: tarea.nombre })
    }

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
            value={currentTask ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  )
}

export default FormTarea
