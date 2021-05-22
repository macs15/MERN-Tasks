import React, { useReducer } from 'react'
import authReducer from './authReducer'
import AuthContext from './authContext'
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  START_LOGIN,
  START_REGISTER
} from '../../types'
import { getUser, login, register } from '../../services/authService'



const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    fetching: false,
    mensaje: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const registrarUsuario = async data => {
    dispatch({ type: START_REGISTER })
    const { token, alert } = await register(data)

    if (!token) return dispatch({ type: REGISTRO_ERROR, payload: alert })

    dispatch({
      type: REGISTRO_EXITOSO,
      payload: token
    })
    usuarioAutenticado()
  }

  const usuarioAutenticado = async () => {
    const user = await getUser()

    if (!user) {
      return dispatch({
        type: LOGIN_ERROR
      })
    }

    dispatch({
      type: OBTENER_USUARIO,
      payload: user
    })
  }

  const iniciarSesion = async data => {
    dispatch({ type: START_LOGIN })
    const { token, alert } = await login(data)

    if (!token) return dispatch({ type: LOGIN_ERROR, payload: alert })


    dispatch({
      type: LOGIN_EXITOSO,
      payload: token
    })

    usuarioAutenticado()
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        fetching: state.fetching,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
