import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import Modal from 'react-modal'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import MapContainer from '../MapContainer/MapContainer'
import axio from '../../services/api/api'
import ListEmpresas from '../../components/ListEmpresas/ListEmpresas'
import ListRubros from '../../components/ListRubros/ListRubros'
import SelectDirecciones from '../../components/SelectDirecciones/SelectDirecciones'

Modal.setAppElement('#root');
class GeoLocationComponent extends Component {

  state = {
    modalIsOpen: false,
    addressIsSetted: false,
    address: {
      dir: "",
      lat: 0,
      lng: 0
    },
    direccionesCliente: [],
    enterprices: [],
    zoom: 15,
    rubros: [],
    rubroEmpresas: "",
    paginasEmpresas: 0,
    aside: true,
    redirigirEmpresa: ""
  }

  componentDidMount() {
    this.getCurrentLocation();
    this.getDireccionesCliente(this.props.emailCliente);
    this.getRubros();
    this.openModal();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    if (this.state.modalIsOpen && this.state.addressIsSetted) {
      this.setState({ modalIsOpen: false });
    }
  }

  closeModalPermiso = () => {
    if (this.state.modalPermisoIsOpen) {
      this.setState({ modalPermisoIsOpen: false });
    }
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

  selectDireccion = (index) => {
    console.log(this.state.direccionesCliente[index].Direccion, this.state.direccionesCliente[index].Latitud, this.state.direccionesCliente[index].Longitud);
    this.setState({
      address: {
        dir: this.state.direccionesCliente[index].Direccion,
        lat: this.state.direccionesCliente[index].Latitud,
        lng: this.state.direccionesCliente[index].Longitud,
      },
      addressIsSetted: true,
      enterprices: []
    }, this.getEmpresas(this.state.rubroEmpresas, this.state.paginasEmpresas, this.state.address.lat, this.state.address.lng))
  }



  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState(
        {
          address: {
            lat: latitude,
            lng: longitude
          }
        }, () => {
          this.getEmpresas(this.state.rubroEmpresas, this.state.paginasEmpresas, this.state.address.lat, this.state.address.lng)
        })
    })
  }

  getRubros = () => {
    axio.get('ObtenerRubros')
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            rubros: data.rubros
          })
        } else {
          console.log("se ve que hubo un erro retirando los rubros, quiza no haya")
        }
      })
  }

  chooseRubro = (GuidRubro) => {
    this.setState({
      rubroEmpresas: GuidRubro,
      enterprices: [],
      paginasEmpresas: 0
    }, () => {
      console.log(this.state.rubroEmpresas, "rubro de las empresas a seleccionar");
      console.log(this.state.enterprices, "empresas");

      this.getEmpresas(this.state.rubroEmpresas, this.state.paginasEmpresas, this.state.address.lat, this.state.address.lng)

    })
  }

  getEmpresas = (idRubro, pagina, lat, lng) => {
    axio.get('ObtenerEmpresasPorRubro', {
      params: {
        idRubro: idRubro,
        pagina: pagina,
        lat: lat,
        lng: lng
      }
    }).then(({ data }) => {
      if (data.message == "Empresas Disponibles") {
        this.setState({ enterprices: this.state.enterprices.concat(data.empresa) })
      } else {
        console.log("se ve que no hay ninguna empresa que envie en esa direccion");
      }
    }).catch(error => {
      console.log(error, "se ve que no se pudo conectar con la api")
    })

  }

  irEmpresa = (rut) => {
    sessionStorage.setItem('direccionActual', JSON.stringify(this.state.address));
    this.setState({
      redirigirEmpresa: rut
    })
  }

  cargarMasEmpresas = () => {
    this.setState({ paginasEmpresas: this.state.paginasEmpresas + 1 },
      () => {
        console.log(this.state.paginasEmpresas);

        this.getEmpresas(this.state.rubroEmpresas, this.state.paginasEmpresas, this.state.address.lat, this.state.address.lng);
      }
    )
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
      }, this.getEmpresas(this.state.rubroEmpresas, this.state.paginasEmpresas, this.state.address.lat, this.state.address.lng))
    }
  }

  openAside = () => {
    this.setState({
      aside: !this.state.aside
    })
  }

  addDireccion = (direccion, latitud, longitud, email) => {
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

  render() {

    if (this.state.redirigirEmpresa != "") {
      return <Redirect to={{
        pathname: `/empresa/${this.state.redirigirEmpresa}`,
        state: { rut: this.state.redirigirEmpresa }
      }} /> ///cambiarlo por /homecliente
    }

    return (
      <div>

        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="direccion modal"
        >
          <h2>Escribe tu direccion</h2>
          <Geosuggest
            placeholder="Ingresa la direccion de envio"
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius="20"
          />
          <SelectDirecciones
            direcciones={this.state.direccionesCliente}
            chooseDireccion={this.selectDireccion}
          />
          <button className="button-normal" onClick={this.closeModal}>close</button>
        </Modal> */}

        <div className="clientContentContainer">
          <div className="homeClientLefAside">
            {this.state.aside && <div className="leftAside">
              <Geosuggest
                placeholder="Ingresa la direccion de envio"
                onSuggestSelect={this.onSuggestSelect}
                location={new google.maps.LatLng(53.558572, 9.9278215)}
                radius="20"
              />
              <SelectDirecciones
                direcciones={this.state.direccionesCliente}
                chooseDireccion={this.selectDireccion}
              />
              <div>
                <div className="direccion-actual">
                  <p>
                    <span className="list-direccion">{this.state.address.dir}</span>
                    <button className="button-normal" onClick={() => this.addDireccion(this.state.address.dir, this.state.address.lat, this.state.address.lng, this.props.emailCliente)}>
                      Agregar
                  </button>
                  </p>
                </div>
                donde desea comprar?
            </div>
              <ListRubros
                rubros={this.state.rubros}
                chooseRubro={this.chooseRubro}
                irEmpresa={this.irEmpresa}
              />
              <ListEmpresas
                empresas={this.state.enterprices}
                verMasEmpresas={this.cargarMasEmpresas}
                irEmpresa={this.irEmpresa}
              />
            </div>}
            <button className="button-normal button-toggle-aside" onClick={this.openAside}>{this.state.aside ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}</button>
          </div>
          <div className="customGoogleMap">
            <MapContainer
              enterprices={this.state.enterprices}
              address={this.state.address}
              irEmpresa={this.irEmpresa}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default GeoLocationComponent;

const customStyles = {
  content: {
    width: '60vw',
    height: '30vh',
    margin: 'auto',
    overflow: 'visible'

  }
};