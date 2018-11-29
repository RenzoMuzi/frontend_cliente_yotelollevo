import React from 'react'

const ListProductos = ({ productos, verProducto, agregarAlCarrito, email, rut}) => (
  <div>
    {productos.map(producto => (
      <div key={producto.ObjectId}>
        <p>aca hay un producto</p>
        <h3>{producto.PropProducto.Nombre}</h3>
        <img src={producto.Imagenes}></img>
        <p>{producto.PropProducto.Descripcion}</p>
        {/* <span>{productos.PropProducto.Puntos}</span> */}
        <button className="button-normal" onClick={() => agregarAlCarrito(email, rut, producto.ObjectId, 1)}>Agregar al carrito</button>
        <button className="button-normal" onClick={() => verProducto(producto)}>Ver</button>
      </div>
    ))}
  </div>
)

export default ListProductos