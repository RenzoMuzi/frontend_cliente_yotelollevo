import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'

import MapContainer from '../../components/MapContainer/MapContainer'
import { getData } from '../../services/api/api'
import ListEmpresas from '../../components/ListEmpresas/ListEmpresas'

class GeoSuggestSearch extends Component {

  state = {
    initialCenter: {
      lat: 0,
      lng: 0
    },
    address: {
      dir: "",
      lat: 0,
      lng: 0
    },
    enterprices: [{ lat: -34.9150803, lng: -56.159808, name: "Empresa1" },
    { lat: -34.9087262, lng: -56.154915700000004, name: "Empresa2" },
    { lat: -34.9127992, lng: -56.16515129999999, name: "Empresa3" }
    ],
    zoom: 15,
    rubroEmpresas: "",
    paginasEmpresas: 0,
  }

  componentDidMount() {
    this.getCurrentLocation();
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

  getEmpresas = (idRubro, pagina, lat, lng) => {
    getData('/ObtenerEmpresasPorRubro/', {
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
        address: newAdress
      })
      console.log(this.state.address)
    }
  }

  onClickMap = (e) => {
    console.log(e)
    // const newAdress = {
    //   dir: "",
    //   lat: e.LatLng.lat(),
    //   lng: e.LatLng.lng()
    // }

    // this.setState({
    //   address: newAdress
    // })
  }

  render() {
    const currentLocation = this.getCurrentLocation();
    console.log(currentLocation);
    return (
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
    )
  }
}

export default GeoSuggestSearch;