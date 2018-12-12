import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

const HeaderEmpresa = ({ rut, email, nombreEmpresa, fotoEmpresa, fotoCliente, nombreCliente, volverYateLoLLevo, verCarrito, promoPuntosCliente }) => (
  <div className="header-wrapper">
    <div>
      <img className="brand-logo-header" src={fotoEmpresa}></img>
      <Link to={`/empresa/${rut}`}>{nombreEmpresa}</Link>
    </div>

    <div className="header-user-info">
      <div className="header-client-picture" >
        <img src={fotoCliente} />
      </div>
      <Link to={`/perfilCliente/${email}`}>{nombreCliente}</Link>
    </div>
    <div>
      promo puntos: {promoPuntosCliente != "null" && promoPuntosCliente}
    </div>
    <div>
      <FaShoppingCart onClick={() => verCarrito(email,rut)} />
    </div>

    <div>
      <button type='button' className="button-normal" onClick={volverYateLoLLevo}>Ya te lo llevo</button>
    </div>
  </div>
)

export default HeaderEmpresa
