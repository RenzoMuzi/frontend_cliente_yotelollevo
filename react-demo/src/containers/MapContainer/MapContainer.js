import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (e, marker, position) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  
    // console.log(position.latLng.lat(), position.latLng.lng(), "position");
    // console.log(marker.name, this.state.activeMarker.name);   
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
          onClick={(e, marker) => this.onMarkerClick(e, marker)}
          name={`Usted esta aqui: ${this.props.address.dir}`}
          position={{ lat: this.props.address.lat, lng: this.props.address.lng }}
        />
        {this.props.enterprices.map((enterprise) =>
          <Marker
            position={{ lat: enterprise.lat, lng: enterprise.lng }}
            key={enterprise.lat + enterprise.lng}
            icon={{
              url: "src/assets/package.png",
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(36, 36)
            }}
            name={enterprise.name}
            onClick={(e, marker, position) => this.onMarkerClick(e, marker, position)}
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