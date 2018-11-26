import React, { Component } from 'react'
// por props pasar los datos del usuario

// en click en empresa o sea en home cliente(geolocationcomponent) llamar a tiene permiso empresa
// si tiene redirige aca con los datos y sino hacer un pop up donde permita acceder datos al usuario
// cuando entra a la empresa va a hacer un llamado a esa funcion (tienepermiso empresa) y si tiene le devuelve true sino 
// redirige al home de nuevo


class Empresa extends Component {
  state = {
    productos: [],
    productoActual: {},
    paginasProducto: 0,
    categoriasProductos: [],
    carrito: {},

    rut: '',

  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Empresa