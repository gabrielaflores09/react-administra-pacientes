import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {

  // Citas en localStorage
  let citasIniciales =  JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales){
    citasIniciales = [];
  }
  // Arreglo de citas
  const [citas, guardarCitas]= useState([]);

  // funcion que toma las citas actuales y la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // Aplicación del useEffect
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  // Elimino cita por Id
  const eliminarCita = (idCita) =>{
    const nuevasCitas = citas.filter( cita => cita.id !== idCita)
    guardarCitas(nuevasCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column"> 
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>

        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
