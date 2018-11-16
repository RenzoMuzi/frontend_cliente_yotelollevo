import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={props.address}
    center={props.address}
    zoom={props.zoom}
    onClick={props.onClick}
  >
    <Marker
      position={props.address}
    />
  </GoogleMap>
);


export default MapWithAMarker