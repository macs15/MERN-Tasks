import React from 'react'
import { useAuth } from '../../context/autenticacion/authState'
import { useProject } from '../../context/proyectos/projectState'
import { useTask } from '../../context/tareas/taskState'

const Barra = () => {
  const { resetProjectsData } = useProject()
  const { resetTasksData } = useTask()
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    logout()
    resetTasksData()
    resetProjectsData()
  }

  return (
    <header className="app-header">
      {usuario ? <p className="nombre-usuario">Hola, <span>{usuario.nombre}</span></p> : <div />}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={handleLogout}
        >Cerrar Sesión</button>
      </nav>
    </header>
  )
}

export default Barra
