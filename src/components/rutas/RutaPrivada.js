import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/autenticacion/authState'

const RutaPrivada = ({ component: Component, ...props }) => {

  const authContext = useAuth()
  const { autenticado, usuarioAutenticado, cargando } = authContext

  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line
  }, [])
  return (
    <Route {...props} render={props => !autenticado && !cargando ? (
      <Redirect to="/" />
    ) : (
      <Component {...props} />
    )} />
  )
}

export default RutaPrivada
