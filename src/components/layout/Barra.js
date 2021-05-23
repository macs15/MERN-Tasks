import React, { useContext } from 'react'
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {
  const { usuario, logout } = useContext(AuthContext)

  return (
    <header className="app-header">
      {usuario ? <p className="nombre-usuario">Hola, <span>{usuario.nombre}</span></p> : <div />}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => logout()}
        >Cerrar Sesión</button>
      </nav>
    </header>
  )
}

export default Barra
