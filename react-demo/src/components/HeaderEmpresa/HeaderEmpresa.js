import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const HeaderEmpresa = ({ nombreCliente, fotoCliente, logout }) => (
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

    <div>
				<button type='button' className="button-normal" onClick={logout}>Salir</button>
      {}
    </div>
  </div>
)

export default HeaderEmpresa
