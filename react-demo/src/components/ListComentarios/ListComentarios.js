import React, { Component } from 'react'

/// pasar por props: comentario, email, rut, productoid, addComentario

class ListComentarios extends Component {
  state = {
    comentarioActual: ''
  }

  handleOnchangeComentarioActual = (valor) => {
    this.setState({
      comentarioActual: valor
    })
  }

  render() {
    return (
      <div>
        <textarea
          onChange={(e) => this.handleOnchangeComentarioActual(e.target.value)}
        />
        <button 
          onClick={() => this.props.addComentario(
            this.state.comentarioActual,
            this.props.emailCliente,
            this.props.rut,
            this.props.productId )}
        >Comentar</button>
        {this.props.comentarios.map(comentario =>
          <div key={comentario.Fecha}>
            <p>{comentario.comentario}</p>
            <span>{comentario.Email}</span><span>{comentario.Fecha}</span>
          </div>
        )}
      </div>
    )
  }
}

export default ListComentarios

//   <div>

  //    public string Comentario { get; set; }
  //     public string Email { get; set; }
  //     public string ObjectIdProducto { get; set; }
  //     public string Rut { get; set; }
  //     public DateTime Fecha { get; set; }
  // </div>