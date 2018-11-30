import React, { Component } from 'react'

import ListComentarios from '../ListComentarios/ListComentarios'
import axios from '../../services/api/api'

class Producto extends Component {
  state = {
    comentarios: [],
  }

  componentDidMount() {
    console.log("aca nombre del producto", this.props.producto.PropProducto.Nombre);
    console.log("aca el rut", this.props.rut);
    this.VerComentariosProducto(this.props.rut, this.props.producto.ObjectId);
  }

  VerComentariosProducto = (rut, idproducto) => {
    axios.get('VerComentariosProducto', {
      params: {
        rut: rut,
        productId: idproducto
      }
    })
      .then(({ data }) => {
        console.log(data);
        if (data.status == 200) {
          console.log("aca los comentarios", data.Comentarios);
          this.setState({
            comentarios: data.Comentarios
          });
        } else {
          console.log("se ve que hubo un problema obteniendo los comentarios")
        }
      })
  }

  render() {
    return (
      <div>
        <h3>{this.props.producto.PropProducto.Nombre}</h3>
        <img src={this.props.producto.Imagenes}></img>
        <p>{this.props.producto.PropProducto.Descripcion}</p>
        <button className="button-normal" onClick={() => this.props.agregarAlCarrito(this.props.email, this.props.rut, this.props.producto.ObjectId, 1)}>comprar</button>
        <button className="button-normal" onClick={this.props.cerrarProducto}>volver</button>
        <ListComentarios
          comentarios={this.state.comentarios}
          productId={this.props.producto.ObjectId}
          emailCliente={this.props.emailCliente}
          rut={this.props.rut}
        />
      </div>
    )
  }
}

export default Producto

