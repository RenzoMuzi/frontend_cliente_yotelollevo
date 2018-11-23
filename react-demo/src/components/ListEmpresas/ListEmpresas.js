import React from 'react'

const ListEmpresas = ({empresas, irEmpresa, verMasEmpresas}) => 
(
  <div>
    <ul>
      {/* {empresas.map(empresa => (
        <li 
          id={empresa.Rut} 
          key={empresa.Rut}
          onClick={() => irEmpresa(empresa.Rut)}
        >
          {empresa.Nombre}
        </li>
      ))} */}
      {empresas.map(empresa => (
        <li 
          id={empresa.name} 
          key={empresa.name}
        >
          {empresa.name}
        </li>
      ))} 
    </ul>
    <button onClick={() => verMasEmpresas()}>Ver mas empresas</button>
  </div>
)

export default ListEmpresas