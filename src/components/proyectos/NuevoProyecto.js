import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { 
        formulario,
        errorformulario,
        mostrarFormulario, 
        agregarProyecto ,
        mostrarError,
        cerrarForm
    } = proyectosContext;

    // definir state del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    // extraer nombre de proyecto
    const { nombre } = proyecto;

    // Lee los valores del input
    const onChangeProyecto = e => {
        e.preventDefault();

        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    // cuando el usuario envia el input
    const onSubmitProyecto = e => {
        e.preventDefault();

        // validar el nombre
        if(nombre.trim() === '') {
            mostrarError();
            return
        };

        // agregar al state
        agregarProyecto(proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        });
    }


    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={mostrarFormulario}
            >
            Nuevo Proyecto</button>

            {formulario
            ?
                <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        onChange={onChangeProyecto}
                        value={nombre}
                        autoFocus={true}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                    <input 
                        type="button"
                        className="btn btn-block btn-secundario"
                        value="Cancelar"
                        onClick={cerrarForm}
                    />
                </form>
            : null
            }

            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio.</p> : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;