import React, { useContext } from 'react'
import AuthContext from '../../context/autenticacion/authContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Barra = () => {
  const { resetProjectsData } = useContext(proyectoContext)
  const { resetTasksData } = useContext(tareaContext)
  const { usuario, logout } = useContext(AuthContext)

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
