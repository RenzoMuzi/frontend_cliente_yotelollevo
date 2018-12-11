import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import { Redirect } from 'react-router-dom'

import ListOrdenes from '../../components/ListOrdenes/ListOrdenes'
import ListDirecciones from '../../components/ListDirecciones/ListDirecciones'
import axio from '../../services/api/api'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
class ClientProfile extends Component {
  state = {
    direccionesCliente: [],
    nombreCliente: '',
    emailCliente: '',
    fotoCliente: '',
    redirectLogin: false,
    address: {
      dir: "",
      lat: 0,
      lng: 0
    },
    addressIsSetted: false,
    ordenes: [],
    ratingEmpresa: 0
  }

  componentDidMount() {
    if (sessionStorage.getItem('infoUsuario')) {
      var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
      this.verInfoCLiente(infoUsuario.Email);
      this.getDireccionesCliente(infoUsuario.Email);
      this.getOrdenesCliente(infoUsuario.Email);
    } else {
      this.setState({ redirectLogin: true })
    }
  }

  logout = () => {
    sessionStorage.setItem('infoUsuario', '');
    sessionStorage.clear();
    this.setState({ redirectLogin: true })
  }

  verInfoCLiente = (email) => {
    axio.get('VerInfoCliente', {
      params: {
        email: email
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            nombreCliente: data.cliente.Nombre,
            emailCliente: data.cliente.Email,
            fotoCliente: data.cliente.Foto
          })
        } else {
          console.log("parece que no se pudo obtener la info del cliente")
        }
      })
  }

  getDireccionesCliente = (email) => {
    const query = `?email=${email}`;
    axio.post(`ListarDireccionesCliente${query}`)
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({ direccionesCliente: data.direcciones })
        } else {
          console.log("se ve que no tiene direcciones o hubo un error")
        }
      })
  }

  getOrdenesCliente = (email) => {
    axio.get('ListarOrdenesDeCliente', {
      params: {
        email: email
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({ ordenes: data.ordenes })
        } else {
          console.log("se ve que no se pudo obtener las ordenes")
        }
      })
  }

  addDireccion = (direccion, longitud, latitud, email) => {
    axio.post('AgregarDireccionCliente', {
      Email: email,
      Direccion: direccion,
      Longitud: longitud,
      Latitud: latitud,
    })
      .then(({ data }) => {
        if (data.status == 201) {
          this.getDireccionesCliente(email);
        } else {
          console.log("se ve que no se pudo agregar la direccion")
        }
      })
  }

  deleteDireccion = (idDireccion, email) => {
    axio.post('BorrarDireccionCliente', {
      GuidDireccion: idDireccion
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.getDireccionesCliente(email);
        } else {
          console.log("se ve que no se pudo borrar la direccion");
        }
      })
  }

  onSuggestSelect = (suggest) => {
    if (suggest) {
      const { location: { lat, lng }, description } = suggest
      const newAdress = {
        dir: description,
        lat: lat,
        lng: lng
      }
      this.setState({
        address: newAdress,
        addressIsSetted: true,
        enterprices: []
      })
    }
  }

  puntuarProducto = (nextValue, rut, email, guidProducto, guidOrden) => {
    axio.post('PuntuarProducto', {
      Rut: rut,
      Email: email,
      GuidProducto: guidProducto,
      CantEstrellas: nextValue,
      GuidOrden: guidOrden
    })
      .then(({ data }) => {
        if (data.status == 200) {
          console.log("se puntuo el producto")
        } else {
          console.log("se ve que no se pudo puntuar el producto")
        }
      })
    // console.log(nextValue)
  }

  puntuarEmpresa = (nextValue, rut, guidOrden) => {
    axio.post('PuntuarEmpresa', {
      Rut: rut,
      IdOrden: guidOrden,
      Puntaje: nextValue
    })
      .then(({ data })=> {
        if (data.status == 200) {
          console.log("se puntuo la empresa")
        } else {
          console.log("se ve que no se pudo puntuar la empresa")
        }
      })
    // console.log(nextValue)
  }

  render() {
    if (this.state.redirectLogin) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div>
        <HeaderComponent
          emailCliente={this.state.emailCliente}
          nombreCliente={this.state.nombreCliente}
          fotoCliente={this.state.fotoCliente}
          logout={this.logout}
        />
        <p>{this.state.emailCliente}</p>
        <img style={imgStyle} src={this.state.fotoCliente} />

        <Geosuggest
          placeholder="Ingresa la direccion de envio"
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
        />
        <div>
          <p>
            <span className="list-direccion">{this.state.address.dir}</span>
            <button className="button-normal" onClick={() => this.addDireccion(this.state.address.dir, this.state.address.lat, this.state.address.lng, this.state.emailCliente)}>
              Agregar
            </button>
          </p>
        </div>
        {this.state.direccionesCliente &&
          <ListDirecciones
            direcciones={this.state.direccionesCliente}
            emailCiente={this.state.emailCliente}
            deleteDireccion={this.deleteDireccion}
          />
        }
        {this.state.ordenes != [] &&
          <ListOrdenes
            ordenes={this.state.ordenes}
            puntuarProducto={this.puntuarProducto}
            puntuarEmpresa={this.puntuarEmpresa}
          />
        }
      </div>
    )
  }
}

export default ClientProfile

const imgStyle = {
  width: '60px',
  height: '60px'
};
