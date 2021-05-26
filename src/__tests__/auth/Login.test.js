import React from 'react'
import { act, configure, render, screen, waitFor } from "../../utils/test-utils"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from '../../components/auth/Login'
import { login } from '../../services/authService'

jest.mock('../../services/authService')


afterAll(() => {
  jest.clearAllMocks()
})

describe('Testing <Login />', () => {
  const credentials = {
    email: 'test@test.com',
    password: '123123'
  }
  login.mockImplementation(data => ({ ...data, token: null, alert: null }))

test('Debe mostrar mensajes de error por campos vacíos', async () => {
  render(<Login />)
  const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

  userEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.queryByText(/todos los campos son obligatorios/i)).toBeInTheDocument()
  })
})

test('Debe hacer peticion de login con datos correctos', async () => {
  render(<Login />)
  const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

  userEvent.type(screen.getByRole('textbox', { name: /email/i }), credentials.email)
  userEvent.type(screen.getByLabelText(/contraseña/i), credentials.password)

  await act(async () => {
    await userEvent.click(submitButton)
  })

  expect(login).toHaveBeenCalledWith({...credentials})
});
})
