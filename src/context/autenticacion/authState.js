import React, { useContext, useReducer } from 'react'
import authReducer from './authReducer'
import AuthContext from './authContext'
import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESS_LOGIN,
  LOGIN_ERROR,
  LOGOUT,
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

    if (!token) return dispatch({ type: ERROR_REGISTER, payload: alert })

    dispatch({
      type: SUCCESS_REGISTER,
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
      type: GET_USER,
      payload: user
    })
  }

  const iniciarSesion = async data => {
    dispatch({ type: START_LOGIN })
    const { token, alert } = await login(data)

    if (!token) return dispatch({ type: LOGIN_ERROR, payload: alert })


    dispatch({
      type: SUCCESS_LOGIN,
      payload: token
    })

    usuarioAutenticado()
  }

  const logout = () => {
    dispatch({
      type: LOGOUT
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
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthState')
  }
  return context
}

export default AuthState
