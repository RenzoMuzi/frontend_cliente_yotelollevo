import React, { Component } from 'react'

import ListDirecciones from '../../components/ListDirecciones/ListDirecciones'
import axio from '../../services/api/api'

class ClientProfile extends Component {
  
  

  render(){
    return(
      <div>
        <p>{this.props.emailCliente}</p>
        <img style={imgStyle} src={this.props.fotoCliente} />
        <ListDirecciones 
          direcciones={this.props.direccionesCliente}
          direccionActual={this.props.direccionActual}
          selectDireccion={this.props.selectDireccion}
          addDireccion={this.props.addDireccion}
          emailCliente={this.props.emailCliente}
          deleteDireccion={this.props.deleteDireccion}
        />
      </div>
    )
  }
}

export default ClientProfile

const imgStyle = {
  width: '60px',
  height: '60px'
};
