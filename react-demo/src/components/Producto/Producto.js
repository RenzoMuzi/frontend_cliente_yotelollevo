import React, { Component } from 'react'

import ListComentarios from '../ListComentarios/ListComentarios'
import axio from '../../services/api/api'

// aca le pasan por props el producto y rut
class Producto extends Component {
  state = {
    comentarios: [],
    seleccionado: false
  }

  componentDidMount() {
   // this.VerComentariosProducto(this.props.rut, this.props.producto.productId);
  }

  VerComentariosProducto = (rut, producto) => {
    this.props.verProducto()
    axio.get('VerComentariosProducto', {
      rut: rut,
      productId: producto.productId
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            comentarios: data.Comentarios
          });
        } else {
          console.log("se ve que hubo un problema obteniendo los comentarios")
        }
      })
    this.setState({ 
      seleccionado: !this.state.seleccionado
    })
  }

  render() {
    return (
      <div>
        <h3>{producto.PropProducto.Nombre}</h3>
        <img src={producto.PropProducto.Imagenes[0]}></img>
        <p>{producto.PropProducto.Descripcion}</p>
        <span>{productos.PropProducto.Puntos}</span>
        <button onClick={() => agregarAlCarrito(producto.ObjectId)}>Agregar al carrito</button>
        {!this.state.seleccionado && <button onClick={() => VerComentariosProducto(this.props.rut, this.props.producto)}>Ver</button>}
        {this.state.seleccionado
          &&
          <ListComentarios
            comentarios={this.state.comentarios}
            productId={this.props.producto.ObjectId}
          />}
      </div>
    )
  }
}

export default Producto