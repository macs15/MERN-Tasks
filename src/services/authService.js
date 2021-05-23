import clienteAxios from '../configs/axios'
import tokenAuth from '../configs/tokenAuth'
import { getErrorMsg, getCustomAlert } from '../helpers/on-error'
import responseStatus from '../helpers/response-code-status'

export const login = async (payload) => {
  const alert = getCustomAlert('Usuario o contraseña incorrecto')

  try {
    const response = await clienteAxios.post('/api/auth', payload)

    if (response.status !== responseStatus.success) return { alert, token: null }

    return { token: response.data.token, alert: null }
  } catch (error) {
    return {
      token: null,
      alert: {
        msg: getErrorMsg(error),
        categoria: 'alerta-error'
      }
    }
  }
}

export const getUser = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    // ToDo: Funcion para enviar el token por headers
    tokenAuth(token)
  }

  try {
    const response = await clienteAxios.get('/api/auth')
    if (response.status !== responseStatus.success) return null

    return response.data.usuario
  } catch (error) {
    console.log(error.response)
    return null
  }
}

export const register = async (data) => {
  try {
    const response = await clienteAxios.post('/api/usuarios', data)
    if (response.status !== responseStatus.success) return { token: null, alert }

    return { token: response.data.token, alert: null }
  } catch (error) {
    return {
      token: null,
      alert: {
        msg: getErrorMsg(error),
        categoria: 'alerta-error'
      }
    }
  }
}
