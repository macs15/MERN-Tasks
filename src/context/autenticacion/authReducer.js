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

export default (state, action) => {
  switch (action.type) {
    case START_REGISTER:
    case START_LOGIN:
      return { ...state, fetching: true }

    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        fetching: false,
        cargando: false
      }

    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false
      }

    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        fetching: false,
        cargando: false
      }

    default:
      return state
  }
}
