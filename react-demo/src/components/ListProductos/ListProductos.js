import React from 'react'

const ListProductos = ({ productos, verProducto, agregarAlCarrito }) => (
  <div>
    {productos.map(producto => (
      <div key={producto.ObjectId}>
        <p>aca hay un producto</p>
        <h3>{producto.PropProducto.Nombre}</h3>
        <img src={producto.Imagenes}></img>
        <p>{producto.PropProducto.Descripcion}</p>
        {/* <span>{productos.PropProducto.Puntos}</span> */}
        <button onClick={() => agregarAlCarrito(producto.ObjectId)}>Agregar al carrito</button>
        <button onClick={() => verProducto(producto)}>Ver</button>
      </div>
    ))}
  </div>
)

export default ListProductos