import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const HeaderComponent = ({ emailCliente, nombreCliente, fotoCliente, logout }) => (
  <div className="header-wrapper">
    <div>
      <img className="brand-logo-header" src='https://i.ibb.co/VxFw00t/package.png'></img>
      <Link to="/homecliente">Ya te lo llevo</Link>
    </div>

    <div className="header-user-info">
      <div className="header-client-picture" >
        <img src={fotoCliente} />
      </div>
      <Link to={`/perfilCliente/${emailCliente}`}>{nombreCliente}</Link>
    </div>

    <div>
				<button type='button' className="button-normal" onClick={logout}>Salir</button>
      {}
    </div>
  </div>
)

export default HeaderComponent
