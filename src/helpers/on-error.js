import responseStatus from "./response-code-status"

export const getCustomAlert = (msg, category = 'alerta-error') => {
  return { msg, categoria: category }
}

const defaultMsg = 'Oops! Error inesperado en backend'

export const handleExpiredToken = error => {
  try {
    if (error.response.status === responseStatus.unauthorized) {
      localStorage.removeItem('token')
    }
  } catch (error) {
    console.log(error);
  }
}

export const getErrorMsg = (error) => {
  try {
    return error.response.data.msg || error.response.data.errores[0]?.msg || defaultMsg
  } catch (error) {
    return defaultMsg
  }
}
