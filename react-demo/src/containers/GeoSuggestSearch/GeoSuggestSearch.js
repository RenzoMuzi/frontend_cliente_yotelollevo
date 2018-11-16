import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';

import MapWithAMarker from '../../components/MapWithMarker/MapWithMarker'


class GeoSuggestSearch extends Component {

  state = {
    address: {
      dir: "",
      lat: -34.9011127,
      lng: -56.16453139999999
    },
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
    }
  }

  onClickMap = (e) => {
    console.log(e.LatLng.lat(), e.LatLng.lng())
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
    console.log(this.state.address.lat, this.state.address.lat);
    return (
      <div>
        <Geosuggest
          placeholder="Ingresa la direccion de envio"
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
        />

        <MapWithAMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          address={this.state.address}
          zoom={this.state.zoom}
          onClick={(e) => this.onClickMap(e)}
        />

      </div>
    )
  }
}

export default GeoSuggestSearch