import React from 'react'

const ListPermisos = ({ permisos, borrarPermiso }) => (
  <div>
    <ul className="wrapper-list-direccion">
      {permisos.map((permiso, index) => (
        <li key={index}>
          <p>{permiso.NombreEmpresa}</p>
          <button className="button-normal-small" onClick={() => borrarPermiso(permiso.Rut, permiso.EmailCliente)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
)

export default ListPermisos

      