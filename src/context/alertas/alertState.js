import React, { useContext, useReducer } from 'react'
import alertReducer from './alertReducer'
import alertContext from './alertContext'

import { SHOW_ALERT, HIDE_ALERT } from '../../types'

const AlertState = props => {
  const initialState = {
    alerta: null
  }

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        categoria
      }
    })

    // limpiar la alerta despues del tiempo establecido
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      })
    }, 3000)
  }

  return (
    <alertContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </alertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(alertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within a AlertState')
  }
  return context
}

export default AlertState
