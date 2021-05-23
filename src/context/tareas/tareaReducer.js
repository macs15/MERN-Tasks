
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

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        projectTasks: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        projectTasks: [action.payload, ...state.projectTasks],
        errortarea: false,
      }
    case TASK_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }
    case VALIDATE_TASK:
      return {
        ...state,
        errortarea: true
      }
    case DELETE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
      }
    case UPDATE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
        currentTask: null
      }
    case CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      }
    case CLEAR_TASK:
      return {
        ...state,
        currentTask: null
      }
    default:
      return state
  }
}
