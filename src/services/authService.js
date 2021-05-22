import clienteAxios from '../configs/axios'
import responseStatus from '../helpers/response-code-status'

const alert = { msg: 'Usuario o contraseña incorrecto', categoria: 'alerta-error' }

export const login = async (payload) => {
  try {
    const response = await clienteAxios.post('/api/auth', payload)

    if (response.status !== responseStatus.success) return { alert: alert, token: null }

    return { token: response.data, alert: null }
  } catch (error) {
    console.log(error.response)
    return {
      token: null,
      alert: {
        msg: error.response.data.msg || error.response.data.errores[0]?.msg,
        categoria: 'alerta-error'
      }
    }
  }
}
