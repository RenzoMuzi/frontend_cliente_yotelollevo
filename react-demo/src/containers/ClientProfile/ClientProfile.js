import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import { Redirect } from 'react-router-dom'
import Modal from 'react-modal'
import StarRatingComponent from 'react-star-rating-component';

import ListPermisos from '../../components/ListPermisos/ListPermisos'
import ListOrdenes from '../../components/ListOrdenes/ListOrdenes'
import ListDirecciones from '../../components/ListDirecciones/ListDirecciones'
import axio from '../../services/api/api'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import { FaAutoprefixer } from 'react-icons/fa';
Modal.setAppElement('#root');

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
    ratingEmpresa: 0,
    permisos: [],
    modalCalificacion: false,
    rutActual: "",
    ordenActual: "",
    emailOrden: "",
    productosActuales: [],
    modalPermisos: false
  }

  componentDidMount() {
    if (sessionStorage.getItem('infoUsuario')) {
      var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
      this.verInfoCLiente(infoUsuario.Email);
      this.getDireccionesCliente(infoUsuario.Email);
      this.getOrdenesCliente(infoUsuario.Email);
      this.listarPermisosUsuario(infoUsuario.Email, 1)
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
      .then(({ data }) => {
        if (data.status == 200) {
          console.log("se puntuo la empresa")
        } else {
          console.log("se ve que no se pudo puntuar la empresa")
        }
      })
    // console.log(nextValue)
  }

  openModalCalificacion = (rut, ordenId, productos, email) => {
    this.setState({
      modalCalificacion: true,
      rutActual: rut,
      ordenActual: ordenId,
      productosActuales: productos,
      emailOrden: email
    })
  }

  closeModal = () => {
    this.setState({
      modalCalificacion: false,
      rutActual: "",
      ordenActual: "",
      productosActuales: [],
      emailOrden: ""
    })
  }

  closeModalPermisos = () => {
    this.setState({
      modalPermisos: false
    })
  }

  listarPermisosUsuario = (email, pagina) => {
    axio.get('ListarPermisosUsuario', {
      params: {
        email: email,
        pagina: pagina
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            permisos: data.permisos
          })
        } else {
          console.log("se ve que no se pudieron obtener los permisos")
        }
      })
  }

  openModalPermisos = () => {
    this.setState({
      modalPermisos: true,
    })
  }

  borrarPermiso = (rut, email) => {
    axio.post('BorrarPermiso', {
      Rut: rut,
      Email: email
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.listarPermisosUsuario(email, 1)
        } else {
          console.log('se ve que no se pudo borrar el permiso')
        }
      })
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
        <div className="clientProfileContent">
          <Modal
            isOpen={this.state.modalCalificacion}
            onRequestClose={this.closeModal}
            style={customStyles2}
            contentLabel="modal Calificacions"
          >
            <h2>Calificaciones</h2>
            <p>Productos</p>
            <ul className="ulCalificarProductos borderBott">
              {this.state.productosActuales.map((producto) => (
                <li className="liCalificarProductos" key={producto.ObjectId}>
                  <span>{producto.NombreProducto}</span>
                  {/* <span>{producto.Cantidad}</span> */}
                  <span>{!producto.Puntuada &&
                    <StarRatingComponent
                      name={`${this.state.ordenActual}${producto.ObjectId}`}
                      starCount={5}
                      onStarClick={(nextValue) => this.puntuarProducto(nextValue, this.state.rutActual, this.state.emailOrden, producto.ObjectId, this.state.ordenActual)}
                    />}</span>
                </li>
              ))}
            </ul>
            <p>Servicio</p>
            <div className="liCalificarProductos">
              <span>Empresa</span>
              <StarRatingComponent
                name={`${this.state.ordenActual}${this.state.rutActual}`}
                starCount={5}
                onStarClick={(nextValue) => this.puntuarEmpresa(nextValue, this.state.rutActual, this.state.ordenActual)}
              />
            </div>
          </Modal>
          <Modal
            isOpen={this.state.modalPermisos}
            onRequestClose={this.closeModalPermisos}
            style={customStyles2}
            contentLabel="modal Permisos"
          >
            <h2>Administrar Permisos</h2>
            <div className="permisosWrapper">
              {this.state.permisos != [] &&
                <ListPermisos
                  permisos={this.state.permisos}
                  borrarPermiso={this.borrarPermiso}
                />
              }
            </div>
          </Modal>

          <div className="generalInformationWrapper">
            <div className="regularInfoUsuario">
              <img style={imgStyle} src={this.state.fotoCliente} />
              <div className="nombreEmailWrapper">
                <p>{this.state.nombreCliente}</p>
                <p>{this.state.emailCliente}</p>
              </div>
            </div>
            <div className="addressrelatedwrapper">

              {this.state.direccionesCliente &&
                <div>
                  <p>Direcciones: </p>
                  <ListDirecciones
                    direcciones={this.state.direccionesCliente}
                    emailCiente={this.state.emailCliente}
                    deleteDireccion={this.deleteDireccion}
                  />
                </div>
              }

              <Geosuggest
                placeholder="Ingresa la direccion de envio"
                onSuggestSelect={this.onSuggestSelect}
                location={new google.maps.LatLng(53.558572, 9.9278215)}
                radius="20"
              />
              <div>
                <p className="liDirecciones">
                  <span className="list-direccion">{this.state.address.dir}</span>
                  {this.state.address.dir != "" && <button className="button-normal-small" onClick={() => this.addDireccion(this.state.address.dir, this.state.address.lat, this.state.address.lng, this.state.emailCliente)}>
                    Agregar
                  </button>}
                </p>
              </div>
              <button className="button" onClick={() => this.openModalPermisos()}>Administrar Permisos</button>
            </div>
          </div>

          <div className="ordenesWrapper">
            {this.state.ordenes != [] &&
              <ListOrdenes
                ordenes={this.state.ordenes}
                puntuarProducto={this.puntuarProducto}
                puntuarEmpresa={this.puntuarEmpresa}
                openModalCalificacion={this.openModalCalificacion}
              />
            }
          </div>
        </div>

      </div>
    )
  }
}

export default ClientProfile

const imgStyle = {
  width: '60px',
  height: '60px'
};

const customStyles2 = {
  content: {
    width: '60vw',
    bottom: 'auto',
    margin: 'auto',
    overflow: 'visible'

  }
};