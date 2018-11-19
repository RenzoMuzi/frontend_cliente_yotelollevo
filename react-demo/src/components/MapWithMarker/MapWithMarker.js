import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={props.address}
    center={props.address}
    zoom={props.zoom}
    onClick={props.onClick}
    noRedraw={false}
  >
    <Marker
      position={props.address}
      
    />

    <Marker
      position={{lat: -34.9097917 , lng: -34.9097917}}
      noRedraw={true}
    />
  </GoogleMap>
);


export default MapWithAMarker