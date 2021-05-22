import React from 'react'
import Sidebar from '../layout/Sidebar'
import FormTarea from '../tareas/FormTarea'
import Barra from '../layout/Barra'
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = React.memo(() => {
  return (
    <div className="contenedor-app">

      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tares">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  )
})

export default Proyectos
