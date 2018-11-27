import React from 'react'

const ListRubros = ({ rubros, chooseRubro }) => (
  <div>
    <select className="select-rubros" onChange={(e) => chooseRubro(e.target.value)}>
      <option className="select-rubros" key="01" value={""}>todos los rubros</option>
      {rubros.map(rubro => (
          <option className="option-rubros" key={rubro.Guid} value={rubro.Guid}>{rubro.Nombre}</option>
        ))}
    </select>
  </div>
)

export default ListRubros