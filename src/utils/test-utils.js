import React from 'react'
import { render } from '@testing-library/react'
import ProjectState from '../context/proyectos/projectState'
import TaskState from '../context/tareas/taskState'
import AlertState from '../context/alertas/alertState'
import AuthState from '../context/autenticacion/authState'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

const AllTheProviders = ({ children }) => {
  return (
    <AuthState>
      <ProjectState>
        <TaskState>
          <AlertState>
            <Router>
              <Switch>
              {children}
              </Switch>
            </Router>
          </AlertState>
        </TaskState>
      </ProjectState>
    </AuthState>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
