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
    axios.post('ComentarProducto', {
      Comentario: comentario,
      Email: email,
      ObjectIdProducto: productId,
      Rut: rut
    })
      .then(({ data }) => {
        if (data.status == 201) {
          this.setState({
            comentarioActual: ""
          }, () => this.props.verComentariosProducto(rut, productId))
        } else {

        }
      })
  }

  render() {
    return (
      <div>
        <textarea rows="4" className="text-area"
          value={this.state.comentarioActual}
          onChange={(e) => this.handleOnchangeComentarioActual(e.target.value)}
          placeholder="Escribe un comentario..."
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
            <div className="wrapper-comentario" key={index}>
              <p>{comentario.Comentario}</p>
              <span className="details-comentario">{comentario.Email}</span><span className="details-comentario flo-right">{comentario.FechaFront}</span>
            </div>
          )}
      </div>
    )
  }
}

export default ListComentarios