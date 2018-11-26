import React from 'react'

const ListRubros = ({ rubros, chooseRubro }) => (
  <div>
    <select onChange={(e) => chooseRubro(e.target.value)}>
      <option key="01" value={""}>todos los rubros</option>
      {rubros.map(rubro => (
          <option key={rubro.Guid} value={rubro.Guid}>{rubro.Nombre}</option>
        ))}
    </select>
  </div>
)

export default ListRubros