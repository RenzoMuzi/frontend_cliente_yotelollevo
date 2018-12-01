import React from 'react'

const ListProductos = ({ productos, verProducto, agregarAlCarrito, email, rut}) => (
  <div className="wrapper-lista-productos">
    {productos.map(producto => (
      <div className="card-producto" key={producto.ObjectId}>
        <div className="wrapper-lista-productos-imagen">
          <img src={producto.Imagenes} />
        </div>
        <div className="wrapper-lista-descripcion-producto">
          <h4>{producto.PropProducto.Nombre}</h4>
          <p>{producto.PropProducto.Descripcion}</p> 
        </div>
        {/* <span>{productos.PropProducto.Puntos}</span> */}
        <button className="button-normal" onClick={() => agregarAlCarrito(email, rut, producto.ObjectId, 1)}>Agregar al carrito</button>
        <button className="button-normal" onClick={() => verProducto(producto)}>Ver</button>
      </div>
    ))}
  </div>
)

export default ListProductos