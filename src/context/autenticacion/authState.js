import React, { useReducer } from 'react'
import authReducer from './authReducer'
import AuthContext from './authContext'
import clienteAxios from '../../configs/axios'
import tokenAuth from '../../configs/tokenAuth'
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  START_LOGIN
} from '../../types'
import { login } from '../../services/authService'



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

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos)

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      })

      usuarioAutenticado()
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  // Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      // ToDo: Funcion para enviar el token por headers
      tokenAuth(token)
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth')
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      })

    } catch (error) {
      console.log(error)
      dispatch({
        type: LOGIN_ERROR
      })
    }
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
