import React from 'react'

const ListDirecciones = ({ emailCliente, direccionActual, direcciones, selectDireccion, addDireccion, deleteDireccion }) => (
  <div>
    <span>{direccionActual.dir}
      <button onClick={() => addDireccion(direccionActual.dir, direccionActual.lat, direccionActual.lng, emailCliente)}>
        Agregar
      </button>
    </span>
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