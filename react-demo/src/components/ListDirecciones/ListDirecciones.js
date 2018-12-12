import React from 'react'

const ListDirecciones = ({ emailCiente, direcciones, deleteDireccion }) => (
  <div>
    <ul className="wrapper-list-direccion">
      {direcciones.map(direccion => (
        <li className="liDirecciones" key={direccion.GuidDireccion}>
          <p>{direccion.Direccion}</p>
          <button className="button-normal-small" onClick={() => deleteDireccion(direccion.GuidDireccion, emailCiente)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
)

export default ListDirecciones