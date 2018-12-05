import React from 'react'

const ListCategorias = ({ categorias, chooseCategoria }) => (
  <div>
    <select className="select-rubros" onChange={(e) => chooseCategoria(e.target.value)}>
      <option className="select-rubros" key="01" value={"none"}>todas las categorias</option>
      {categorias.map(categoria => (
          <option className="option-rubros" key={categoria.Guid} value={categoria.Guid}>{categoria.Nombre}</option>
        ))}
    </select>
  </div>
)

export default ListCategorias