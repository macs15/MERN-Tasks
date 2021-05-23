import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from '../../context/alertas/alertState'
import { useAuth } from '../../context/autenticacion/authState'


const NuevaCuenta = (props) => {
  const { alerta, mostrarAlerta } = useAlert()
  const { mensaje, autenticado, fetching, registrarUsuario } = useAuth()

  // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])

  const [usuario, guardarUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })

  const { nombre, email, password, confirmar } = usuario

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    if (!nombre.trim() || !email.trim() || !password.trim() || !confirmar.trim()) {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return
    }

    if (password.length < 6) {
      mostrarAlerta('La contraseña debe tener un minimo de (6) caracteres', 'alerta-error')
      return
    }

    // confirmar igualdad de passwords
    if (password !== confirmar) {
      mostrarAlerta('Las contraseñas deben ser iguales', 'alerta-error')
      return
    }

    registrarUsuario({ nombre, email, password })
  }

  return (
    <div className="form-usuario">
      { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una Cuenta</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Contraseña"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value={fetching ? 'Cargando...' : 'Registrarme'}
            />
          </div>
        </form>

        <Link to={'/'} className="enlace-cuenta">Iniciar Sesión</Link>
      </div>
    </div>
  )
}

export default NuevaCuenta
