import axiosClient from "../configs/axios"
import { getCustomAlert, getErrorMsg, handleExpiredToken } from "../helpers/on-error"
import responseStatus from "../helpers/response-code-status"

const projectService = {
  getProjects: async () => {
    const alert = getCustomAlert('Hubo un error obteniendo los proyectos')
    try {
      const response = await axiosClient.get('/api/proyectos')
      if (response.status !== responseStatus.success) return { alert, projects: [] }

      return { projects: response.data.proyectos, alert: null }
    } catch (error) {
      handleExpiredToken(error)
      return { projects: [], alert: getCustomAlert(getErrorMsg(error)) }
    }
  }
}

export default projectService
