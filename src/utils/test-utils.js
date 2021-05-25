import React from 'react'
import { render } from '@testing-library/react'
import ProjectState from '../context/proyectos/projectState'
import TaskState from '../context/tareas/taskState'
import AlertState from '../context/alertas/alertState'

const AllTheProviders = ({ children }) => {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          {children}
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
