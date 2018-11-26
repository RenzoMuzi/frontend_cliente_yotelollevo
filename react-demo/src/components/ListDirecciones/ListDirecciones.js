import React from 'react'

const ListDirecciones = ({ emailCliente, direccionActual, direcciones, selectDireccion, addDireccion, deleteDireccion }) => (
  <div>
    <p>
      <span className="list-direccion">{direccionActual.dir}</span>
      <button className="button-normal" onClick={() => addDireccion(direccionActual.dir, direccionActual.lat, direccionActual.lng, emailCliente)}>
        Agregar
      </button>
    </p>
    <ul>
      {direcciones.map(direccion => (
        <li key={direccion.GuidDireccion}>
          <a onClick={(direccion) => selectDireccion(direccion)}>{direccion.Direccion}</a>
          <button onClick={() => deleteDireccion(direccion.GuidDireccion)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
)

export default ListDirecciones