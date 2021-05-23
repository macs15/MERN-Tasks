import React, { useReducer } from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import { SHOW_ALERT, HIDE_ALERT } from '../../types'

const AlertaState = props => {
  const initialState = {
    alerta: null
  }

  const [state, dispatch] = useReducer(alertaReducer, initialState)

  // funciones
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
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </alertaContext.Provider>
  )
}

export default AlertaState
