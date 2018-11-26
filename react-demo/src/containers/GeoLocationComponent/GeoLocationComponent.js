import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import Modal from 'react-modal'

import MapContainer from '../MapContainer/MapContainer'
import axio from '../../services/api/api'
import ListEmpresas from '../../components/ListEmpresas/ListEmpresas'
import ClientProfile from '../../containers/ClientProfile/ClientProfile'
import ListRubros from '../../components/ListRubros/ListRubros'

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

  getDireccionesCliente = (email) => {
    const query = `?email=${email}`;
    axio.post(`ListarDireccionesCliente${query}`)
      .then(({ data })=> {
        if (data.status == 200) {
          this.setState({ direccionesCliente: data.direcciones })
        } else {
          console.log("se ve que no tiene direcciones o hubo un error")
        }
      })
  }

  selectDireccion = (direccion) => {
    this.setState({
      address: {
        dir: direccion.Direccion,
        lat: direccion.Latitud,
        lng: direccion.Longitud
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
      .then(({data}) => {
        if (data.status == 201) {
          this.getDireccionesCliente(email);
        } else {
          console.log("se ve que no se pudo agregar la direccion")
        }
      })
  }

  deleteDireccion = (idDireccion, email) => {
    axio.delete('BorrarDireccionCliente', {
      data: {
        GuidDireccion: idDireccion
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.getDireccionesCliente(email);
        } else {
          console.log("se ve que no se pudo borrar la direccion");
        }
      })
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

    console.log(this.state.address, "holaa");
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
      console.log(lat, lng, description)
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
      console.log(this.state.address)
    }
  }

  render() {
    return (
      <div>
        <ClientProfile
          emailCliente={this.props.emailCliente}
          nombreCliente={this.props.nombreCliente}
          fotoCliente={this.props.fotoCliente}
          direccionesCliente={this.state.direccionesCliente}
          direccionActual={this.state.address}
          selectDireccion={this.selectDireccion}
          addDireccion={this.addDireccion}
          deleteDireccion={this.deleteDireccion}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Escribe tu direccion</h2>
          <Geosuggest
            placeholder="Ingresa la direccion de envio"
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius="20"
          />
          <button onClick={this.closeModal}>close</button>
        </Modal>

        <div className="clientContentContainer">

          <div className="homeClientLefAside">
            <Geosuggest
              placeholder="Ingresa la direccion de envio"
              onSuggestSelect={this.onSuggestSelect}
              location={new google.maps.LatLng(53.558572, 9.9278215)}
              radius="20"
            />

            <div>
              donde desea comprar?
            </div>
            <ListRubros
              rubros={this.state.rubros}
              chooseRubro={this.chooseRubro}
            />
            <ListEmpresas
              empresas={this.state.enterprices}
              verMasEmpresas={this.cargarMasEmpresas}
            />
          </div>

          <div className="customGoogleMap">
            <MapContainer
              enterprices={this.state.enterprices}
              address={this.state.address}
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