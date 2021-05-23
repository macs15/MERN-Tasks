import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CLOSE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
  RESET_CONTEXT
} from '../../types'
import { initialState } from '../proyectos/proyectoState'

export default (state, action) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state,
        formulario: true
      }
    case GET_PROJECTS:
      return {
        ...state,
        proyectos: action.payload
      }
    case ADD_PROJECT:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorformulario: false
      }
    case VALIDATE_FORM:
      return {
        ...state,
        errorformulario: true
      }
    case CLOSE_FORM:
      return {
        ...state,
        formulario: false,
        errorformulario: false
      }
    case CURRENT_PROJECT:
      return {
        ...state,
        proyecto: state.proyectos.find(proyecto => proyecto._id === action.payload)
      }
    case DELETE_PROJECT:
      return {
        ...state,
        proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
        proyecto: null
      }
    case PROJECT_ERROR:
      return {
        ...state,
        mensaje: action.payload
      }
    case RESET_CONTEXT:
      return initialState
    default:
      return state
  }
}
