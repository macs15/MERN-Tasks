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

export default (state, action) => {
  switch (action.type) {
    case START_REGISTER:
    case START_LOGIN:
      return { ...state, fetching: true }

    case SUCCESS_LOGIN:
    case SUCCESS_REGISTER:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        fetching: false,
        cargando: false
      }

    case GET_USER:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false
      }

    case LOGOUT:
    case LOGIN_ERROR:
    case ERROR_REGISTER:
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
