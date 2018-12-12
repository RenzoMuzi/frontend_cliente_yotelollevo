import React from 'react'

const ListProductos = ({ productos, verProducto, agregarAlCarrito, comprarProductoConPuntos, email, rut, direccion}) => (
  <div className="wrapper-lista-productos">
    {productos.map(producto => (
      <div className="card-producto borderGrey" key={producto.ObjectId}>
        <div className="wrapper-lista-productos-imagen">
          <img src={producto.Imagenes[0]} />
        </div>
        <div className="wrapper-lista-descripcion-producto">
          <h4>{producto.PropProducto.Nombre}</h4>
          <p>{producto.PropProducto.Descripcion}</p> 
          <span>U$D - {producto.PropProducto.Precio}</span>
          <br/>
          <span>puntos - {producto.PropProducto.Puntos}</span>
        </div>
        {/* <span>{productos.PropProducto.Puntos}</span> */}
        <button className="button-normal" onClick={() => comprarProductoConPuntos(rut, email, direccion, producto.ObjectId)}>Canjear</button>
        <button className="button-normal" onClick={() => agregarAlCarrito(email, rut, producto.ObjectId, 1)}>Agregar al carrito</button>
        <button className="button-normal" onClick={() => verProducto(producto)}>Ver</button>
      </div>
    ))}
  </div>
)

export default ListProductos