
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
        tareasproyecto: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        tareasproyecto: [action.payload, ...state.tareasproyecto],
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
        tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
      }
    case UPDATE_TASK:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
      }
    case CURRENT_TASK:
      return {
        ...state,
        tareaseleccionada: action.payload
      }
    case CLEAR_TASK:
      return {
        ...state,
        tareaseleccionada: null
      }
    default:
      return state
  }
}
