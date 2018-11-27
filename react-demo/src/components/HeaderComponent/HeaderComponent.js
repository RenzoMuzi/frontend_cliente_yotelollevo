import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const HeaderComponent = ({ nombreCliente, fotoCliente }) => (
  <div className="header-wrapper">
    <div>
      <img className="brand-logo-header" src='/src/assets/package.png'></img>
      <Link to="/homecliente">Ya te lo llevo</Link>
    </div>
    <div className="header-user-info">
      <div className="header-client-picture" >
        <img src={fotoCliente} />
      </div>
      <Link to="/perfilCliente">{nombreCliente}</Link>
    </div>

  </div>
)

export default HeaderComponent
