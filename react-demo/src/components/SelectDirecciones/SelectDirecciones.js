import React from 'react'

const SelectDirecciones = ({ direcciones, chooseDireccion }) => (
  <div>
    { direcciones != []
      &&
      <select className="select-rubros" onChange={(e) => chooseDireccion(e.target.value)}>
        <option className="select-rubros" key="01" value={""}>Elije Direccion</option>
        {direcciones.map((direccion, index) => (
          <option className="option-rubros" key={direccion.GuidDireccion} value={index}>{direccion.Direccion}</option>
        ))}
      </select>
    }
  </div>
)

export default SelectDirecciones