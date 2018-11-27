import React, { Component } from 'react'

import axios from '../../services/api/api'
// por props pasar los datos del usuario, y empresa tipo rut

// en click en empresa o sea en home cliente(geolocationcomponent) llamar a tiene permiso empresa
// si tiene redirige aca con los datos y sino hacer un pop up donde permita acceder datos al usuario
// cuando entra a la empresa va a hacer un llamado a esa funcion (tienepermiso empresa) y si tiene le devuelve true sino 
// redirige al home de nuevo


class Empresa extends Component {
  state = {
    permitido: false,
    productos: [],
    productoActual: {},
    paginasProducto: 0,
    // categoriasProductos: [], ver si va o no
    carrito: {},

    rut: '', //esto creo que lo pasa por las props

  }

  componentDidMount() {
    // this.getCatergoriasProductos(); ver si va o no

    this.tienePermiso(this.props.rut, this.props.emailCliente);
    this.getProductos(this.props.rut, this.state.paginasProducto);
  }

  // getCatergoriasProductos = () => {

  // }

  tienePermiso = (rut, email) => {
    axios.get('TienePermisoUsuario', {
      params: {
        rut: rut,
        email: email
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            permitido: true
          })
        } else {
          console.log('se ve que no tenes permitido entrar a esta empresa, te vamos a redirigir al home')
        }
      })
  }

  getProductos = (rut, index) => {
    axios.get('ObtenerProductos', {
      params: {
        rut: rut,
        index: index
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            productos: data.productos
          });
        } else {
          console.log("se ve que no se pudieron obtener los productos")
        }
      })
  }


  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Empresa