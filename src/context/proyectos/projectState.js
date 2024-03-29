import React, { useContext, useReducer } from 'react'
import ProjectContext from './projectContext'
import proyectoReducer from './projectReducer'
import axiosClient from '../../configs/axios'
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CLOSE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
  RESET_CONTEXT,
} from '../../types'
import projectService from '../../services/projectService'

export const initialState = {
  proyectos: [],
  formulario: false,
  errorformulario: false,
  proyecto: null,
  mensaje: null
}

const ProjectState = props => {
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  const mostrarFormulario = () => {
    dispatch({
      type: PROJECT_FORM,
    })
  }

  const obtenerProyectos = async () => {
      const { projects, alert } = await projectService.getProjects()

      if (alert) return dispatch({ type: PROJECT_ERROR, payload: alert })

      dispatch({
        type: GET_PROJECTS,
        payload: projects
      })
  }

  const agregarProyecto = async proyecto => {

    try {
      const resultado = await axiosClient.post('/api/proyectos', proyecto)
      dispatch({
        type: ADD_PROJECT,
        payload: resultado.data
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }

      dispatch({
        type: PROJECT_ERROR,
        payload: alerta
      })
    }

  }

  const mostrarError = () => {
    dispatch({
      type: VALIDATE_FORM
    })
  }

  const cerrarForm = () => {
    dispatch({
      type: CLOSE_FORM
    })
  }

  const proyectoActual = proyectoId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: proyectoId
    })
  }

  const eliminarProyecto = async proyectoId => {
    try {
      await axiosClient.delete(`/api/proyectos/${proyectoId}`)

      dispatch({
        type: DELETE_PROJECT,
        payload: proyectoId,
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }

      dispatch({
        type: PROJECT_ERROR,
        payload: alerta
      })
    }
  }

  const resetProjectsData = () => dispatch({ type: RESET_CONTEXT })

  return (
    <ProjectContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        cerrarForm,
        proyectoActual,
        eliminarProyecto,
        resetProjectsData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a ProjectState')
  }
  return context
}

export default ProjectState


