import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4'

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
    });

    const [error, actualizarError] = useState(false)

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault();

        //Validar datos
        if(mascota.trim() === '' || propietario.trim() === ''
            || fecha.trim() ==='' || hora.trim() === '' 
            || sintomas.trim() === ''
        ){
            actualizarError(true);
            return;
        }
        // Eliminar el mensaje de error
        actualizarError(false);
        
        // Asignar ID
        cita.id = uuid();
        // Crear la cita
        crearCita(cita);

        // Reiniciar form
        actualizarCita({
            mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
        })

    }
    return (
        <Fragment>
            <h2>Crear Cita</h2>
            { error ? 
                <p className="alert alert-danger">
                    Todos los campos son obligatorios</p>  
            : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    placeholder="Descripción de síntomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;