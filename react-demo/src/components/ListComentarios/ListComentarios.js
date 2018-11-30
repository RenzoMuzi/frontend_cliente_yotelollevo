import React, { Component } from 'react'
import axios from '../../services/api/api'

class ListComentarios extends Component {
  state = {
    comentarioActual: '',
  }

  handleOnchangeComentarioActual = (valor) => {
    this.setState({
      comentarioActual: valor
    })
  }

  addComentario = (comentario, email, rut, productId) => {
    axios.post('ComentarioProducto', {
      Comentario: comentario,
      Email: email,
      ObjectIdProducto: productId,
      Rut: rut
    })
      .then(({ data }) => {
        if (data.state == 201) {
          this.setState({
            comentarioActual: ""
          })
        } else {

        }
      })
  }

  render() {
    return (
      <div>
        <textarea
          value={this.state.comentarioActual}
          onChange={(e) => this.handleOnchangeComentarioActual(e.target.value)}
        />
        <button className="button-normal"
          onClick={() => this.addComentario(
            this.state.comentarioActual,
            this.props.emailCliente,
            this.props.rut,
            this.props.productId)}
        >
          Comentar
        </button>
        {(this.props.comentarios) &&
          this.props.comentarios.map((comentario, index) =>
            <div key={index}>
              <p>{comentario.comentario}</p>
              <span>{comentario.Email}</span><span>{comentario.Fecha}</span>
            </div>
          )}
      </div>
    )
  }
}

export default ListComentarios