import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';

import MapContainer from '../../components/MapContainer/MapContainer'
// import MapWithAMarker from '../../components/MapWithMarker/MapWithMarker'


class GeoSuggestSearch extends Component {

  state = {
    initialCenter: {
      lat: -34.9011127,
      lng: -56.16453139999999
    },
    address: {
      dir: "",
      lat: -34.9011127,
      lng: -56.16453139999999
    },
    enterprices: [{ lat: -34.9150803, lng: -56.159808, name: "Empresa1" },
    { lat: -34.9087262, lng: -56.154915700000004, name: "Empresa2" },
    { lat: -34.9127992, lng: -56.16515129999999, name: "Empresa3" }
    ],
    zoom: 15
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
    console.log(this.state.address.lat, this.state.address.lng);
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
        </div>
        

        <div className="customGoogleMap">
          <MapContainer
            initialCenter={this.state.initialCenter}
            enterprices={this.state.enterprices}
            address={this.state.address}
          />
        </div>


      </div>
    )
  }
}

export default GeoSuggestSearch