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
          console.log("aca los comentarios", data.comentarios);
          this.setState({
            comentarios: data.comentarios
          });
        } else {
          console.log("se ve que hubo un problema obteniendo los comentarios")
        }
      })
  }

  render() {
    return (
      <div className="wrapper-producto">
        <h3>{this.props.producto.PropProducto.Nombre}</h3>
        <div className="wrapper-producto-imagen">
          <img src={this.props.producto.Imagenes} />
        </div>
        <div className="wrapper-descripcion">
          <p>Descripcion:</p>
          <p>{this.props.producto.PropProducto.Descripcion}</p>
          <span>U$D - {this.props.producto.PropProducto.Precio}</span>
          <br/>
          <span>puntos - {this.props.producto.PropProducto.Puntos}</span>
          <div className="wrapper-boton-comprar">
            <button className="button-normal" onClick={() => this.props.agregarAlCarrito(this.props.emailCliente, this.props.rut, this.props.producto.ObjectId, 1)}>comprar</button>
            <button className="button-normal" onClick={this.props.cerrarProducto}>volver</button>
          </div>
        </div>

        <ListComentarios
          verComentariosProducto={this.VerComentariosProducto}
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

