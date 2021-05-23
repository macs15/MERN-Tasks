import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import taskService from '../../services/taskService'

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAR_TASK,
  RESET_CONTEXT,
  TASK_ERROR
} from '../../types'

export const initialState = {
  projectTasks: [],
  errorMessage: null,
  errortarea: false,
  currentTask: null
}

const TareaState = props => {
  const [state, dispatch] = useReducer(tareaReducer, initialState)

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

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    })
  }

  const deleteTask = async (id, projectId) => {
    const { alert, deleted } = await taskService.deleteTask(id, projectId)

    if (!deleted) return dispatch({ type: TASK_ERROR, payload: alert })

    dispatch({
      type: DELETE_TASK,
      payload: { id, alert }
    })
  }

  const setCurrentTask = tarea => {
    dispatch({
      type: CURRENT_TASK,
      payload: tarea
    })
  }

  // Edita o modifica una tarea
  const updateTask = async tarea => {
    const { task, alert } = await taskService.updateTask(tarea)

    if (!task) return dispatch({ type: TASK_ERROR, payload: alert })

    dispatch({
      type: UPDATE_TASK,
      payload: task
    })
  }

  // elimina la currentTask del state
  const limpiarTarea = () => {
    dispatch({
      type: CLEAR_TASK
    })
  }

  const resetTasksData = () => dispatch({ type: RESET_CONTEXT })

  return (
    <TareaContext.Provider
      value={{
        projectTasks: state.projectTasks,
        errorMessage: state.errorMessage,
        errortarea: state.errortarea,
        currentTask: state.currentTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        setCurrentTask,
        updateTask,
        limpiarTarea,
        resetTasksData
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
