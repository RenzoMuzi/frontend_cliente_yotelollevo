import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarckerOver = (e, marker, position) => {
    if (this.state.activeMarker.name != marker.name) {
      this.setState({
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  }

  onEmpresaClick = (e, marker, position, rut) => {
    // this.onMarkerClick(e, marker, position);
    console.log(marker);
    this.props.irEmpresa(rut)
  }

  onMapClicked = (map, e) => {
    console.log(e, "evento");
    console.log(map);

  }

  render() {
    return (
      <Map
        google={google}
        zoom={14}
        center={this.props.address}
        onClick={(map, e) => this.onMapClicked(map, e)}
        centerAroundCurrentLocation={true}
      >
        <Marker
          onMouseover={(e, marker) => this.onMarckerOver(e, marker)}
          name={`Usted esta aqui: ${this.props.address.dir}`}
          position={{ lat: this.props.address.lat, lng: this.props.address.lng }}
        />
        {this.props.enterprices.map((enterprise) =>
          <Marker
            position={{ lat: enterprise.Latitud, lng: enterprise.Longitud }}
            key={enterprise.Rut}
            icon={{
              url: "https://i.ibb.co/VxFw00t/package.png",
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(36, 36)
            }}
            name={enterprise.Nombre}
            onMouseover={(e, marker, position) => this.onMarckerOver(e, marker, position)}

            onClick={(e, marker, position) => this.onEmpresaClick(e, marker, position, enterprise.Rut)}
          />
        )}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.activeMarker.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default MapContainer
// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyBVDtECwHSMjwOqjX9NG9x0sLN2mKe0Pak")
// })(MapContainer)