import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from '../../configs/axios'
import taskService from '../../services/taskService'

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAR_TASK,
  TASK_ERROR,
} from '../../types'

const TareaState = props => {
  const InitialState = {
    tareasproyecto: [],
    errorMessage: null,
    errortarea: false,
    tareaseleccionada: null
  }

  const [state, dispatch] = useReducer(TareaReducer, InitialState)

  const getTasks = async projectId => {
    const { tasks, alert } = await taskService.getTasks(projectId)

    if (alert) return dispatch({ type: TASK_ERROR, payload: alert })

    dispatch({
      type: TASKS_PROJECT,
      payload: tasks
    })
  }

  const addTask = async tarea => {
    const { task, alert } = await taskService.createTask(tarea)

    if (!task) return dispatch({ type: TASK_ERROR, payload: alert })

    dispatch({
      type: ADD_TASK,
      payload: task
    })
  }

  const validarTarea = () => {
    dispatch({
      type: VALIDATE_TASK
    })
  }

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Extraer una tarea para edición
  const guardarTareaActual = tarea => {
    dispatch({
      type: CURRENT_TASK,
      payload: tarea
    })
  }

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

      dispatch({
        type: UPDATE_TASK,
        payload: resultado.data.tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  // elimina la tareaseleccionada del state
  const limpiarTarea = () => {
    dispatch({
      type: CLEAR_TASK
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errorMessage: state.errorMessage,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        getTasks,
        addTask,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
