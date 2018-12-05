import React from 'react'

const ListDirecciones = ({ emailCiente, direcciones, deleteDireccion }) => (
  <div>
    {/* <p>
      <span className="list-direccion">{direccionActual.dir}</span>
      <button className="button-normal" onClick={() => addDireccion(direccionActual.dir, direccionActual.lat, direccionActual.lng, emailCliente)}>
        Agregar
      </button>
    </p> */}
    <ul>
      {direcciones.map(direccion => (
        <li key={direccion.GuidDireccion}>
          <p>{direccion.Direccion}</p>
          <button onClick={() => deleteDireccion(direccion.GuidDireccion, emailCiente)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
)

export default ListDirecciones