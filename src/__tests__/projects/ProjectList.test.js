import React from 'react'
import { act, configure, fireEvent, render, screen, waitFor } from "../../utils/test-utils"
import '@testing-library/jest-dom'
import taskService from '../../services/taskService'
import projectService from '../../services/projectService'
import ListadoProyectos from '../../components/proyectos/ListadoProyectos'

configure({ asyncUtilTimeout: 5000 })
beforeAll(() => {
  jest.mock('../../services/taskService')
  jest.mock('../../services/projectService')
})

afterAll(() => {
  jest.clearAllMocks()
})

describe('Testing <ListadoProyectos />', () => {
  const project = {
    _id: 1,
    nombre: 'testing a project'
  }
  taskService.getTasks = jest.fn().mockResolvedValue({ tasks: [], alert: null })
  projectService.getProjects = jest.fn().mockResolvedValue({ projects: [project], alert: null })

  test('Debe imprimir el componente', async () => {

    render(<ListadoProyectos />)

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: project.nombre })).toBeInTheDocument()
    })
  })

  test('Debe seleccionarse el proyecto y marcase como activo', async () => {

    render(<ListadoProyectos />)
    
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: project.nombre })).toBeInTheDocument()
    })
    
    act(() => {
      fireEvent.click(screen.queryByRole('button', { name: project.nombre }))
    })
    
    await waitFor(() => 
      expect(screen.queryByRole('listitem', { name: project.nombre }).classList.contains('active-project')).toBe(true)
    )
  })
})
