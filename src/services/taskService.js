import axiosClient from "../configs/axios"
import { getCustomAlert, getErrorMsg, handleExpiredToken } from "../helpers/on-error"
import responseStatus from "../helpers/response-code-status"

const taskService = {
  createTask: async task => {
    const alert = getCustomAlert('Hubo un error creando la tarea')
    try {
      const response = await axiosClient.post('/api/tareas', task)
      if (response.status !== responseStatus.success) return { alert, task: null }

      return { task: response.data.tarea, alert: null }
    } catch (error) {
      handleExpiredToken(error)
      return { task: null, alert: getCustomAlert(getErrorMsg(error)) }
    }
  },

  getTasks: async projectId => {
    try {
      const response = await axiosClient.get('/api/tareas', { params: { proyecto: projectId } })
      if (response.status !== responseStatus.success) return { alert, tasks: [] }

      return { tasks: response.data.tareas, alert: null }
    } catch (error) {
      handleExpiredToken(error)
      return { tasks: [], alert: getCustomAlert(getErrorMsg(error)) }
    }
  },

  updateTask: async task => {
    try {
      const response = await axiosClient.put(`/api/tareas/${task._id}`, task)
      if (response.status !== responseStatus.success) return { alert, task: null }

      return { task: response.data.tarea, alert: null }
    } catch (error) {
      handleExpiredToken(error)
      return { task: null, alert: getCustomAlert(getErrorMsg(error)) }
    }
  },

  deleteTask: async (id, projectId) => {
    try {
      const response = await axiosClient.delete(`/api/tareas/${id}`, { params: { proyecto: projectId } })
      if (response.status !== responseStatus.success) return { alert, deleted: false }

      return { deleted: true, alert: getCustomAlert(response.data.msg, 'alerta-ok') }
    } catch (error) {
      handleExpiredToken(error)
      return { deleted: false, alert: getCustomAlert(getErrorMsg(error)) }
    }
  }
}

export default taskService
