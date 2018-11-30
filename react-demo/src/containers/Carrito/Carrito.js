import React, { Component } from 'react'

import axios from '../../services/api/api'

class Carrito extends Component {
  state = {
    carrito: {},
    fetchData: false
  }

  componentDidMount() {
    this.verCarritoCliente(this.props.emailCliente, this.props.rut)
  }

  verCarritoCliente = (email, rut) => {
    axios.post('VerCarritodeCliente', {
      EmailCliente: email,
      Rut: rut
    })
      .then(({ data }) => {
        if (data.status == 200) {
          console.log(data.carrito);
          this.setState({
            carrito: data.carrito,
            fetchData: true
          })
        } else {
          console.log("se ve que no se pudo ver el carrito")
        }
      })
  }

  render() {
    let total = 0;
    return (
      
      <div>
        <h1>Soy el carrito mas pro</h1>
        {this.state.fetchData
          &&
        <div>
          {this.state.carrito.Productos.map(prod => {
            total += prod.Cantidad * prod.PropProducto.Precio
            return(
            <div key={prod.ObjectId}>
              <div>
                <img src={prod.Imagenes} />
              </div>

              <div>
                {prod.PropProducto.Nombre}
              </div>

              <div>
                {prod.Cantidad}
              </div>

              <div>
                {prod.PropProducto.Precio}
              </div>
            </div>)
          })}
          <div>
            Total: USD {total}
          </div>
        </div>}

      </div>
    )
  }

}

export default Carrito