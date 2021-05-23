import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAlert } from "../../context/alertas/alertState"
import { useAuth } from "../../context/autenticacion/authState"

const Login = ({ history }) => {
  const alertaContext = useAlert()
  const { mensaje, autenticado, iniciarSesion, fetching } = useAuth()
  const [usuario, guardarUsuario] = useState({
    email: "test@test.com",
    password: "123123",
  })

  const { alerta, mostrarAlerta } = alertaContext

  useEffect(() => {
    if (autenticado) {
      history.push("/proyectos")
    }
  }, [mensaje, autenticado, history])

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje])

  const { email, password } = usuario

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
      return
    }

    iniciarSesion({ email, password })
  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          {alerta ? (
            <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
          ) : null}
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value={fetching ? 'Cargando...' : 'Iniciar Sesión'}
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  )
}

export default Login
