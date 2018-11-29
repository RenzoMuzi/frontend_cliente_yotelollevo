import React, { Component } from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import axios from '../../services/api/api'
import ListProductos from '../../components/ListProductos/ListProductos'

Modal.setAppElement('#root');

class Empresa extends Component {
  state = {
    permitido: false,
    productos: [],
    productoActual: {},
    paginasProducto: 0,
    // categoriasProductos: [], ver si va o no
    carrito: [],  // array de [producto,cantidad]
    redirectLogin: false,
    redirectHome: false,
    openModalPermiso: false,
    nombreEmpresa: "",
    fotoEmpresa: ""
  }

  componentDidMount() {
    if (sessionStorage.getItem('infoUsuario')) {
      var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
      this.tienePermisoUsuario(this.props.match.params.rut, infoUsuario.Email);
    } else {
      this.setState({ redirectLogin: true })
    }
    // this.getCatergoriasProductos();
    this.getProductos(this.props.match.params.rut, this.state.paginasProducto);
  }

  verEmpresa = (rut) => {
    axios.get('VerEmpresa', {
      params: {
        rut: rut
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
           this.setState({
             nombreEmpresa: "default",  //cambiar por data.NombreEmpresa
             fotoEmpresa: "default" //cambiar por data.FotoEmpresa pero facu dijo que es un array o sea que seria tipo data.empresas[0].foto
           })
        } else {
          console.log("se ve que no se pudo obtener datos de la empresa");
        }

      })
  }

  tienePermisoUsuario = (rut, email) => {
    axios.get('TienePermisoUsuario', {
      params: {
        rut: rut,
        email: email
      }
    })
      .then(({ data }) => {
        if (data.message == "false") {
          this.openModalPermiso()
        } else {
          //cerrar modal
        }

      })
  }

  closeModalPermiso = () => {
    if (this.state.openModalPermiso) {
      this.setState({
        openModalPermiso: false
      })
    }
  }

  openModalPermiso = () => {
    if (!this.state.openModalPermiso) {
      this.setState({
        openModalPermiso: true
      })
    }
  }

  aceptarBrindarDatos = () => {
    const infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
    this.otorgarPermisoUsuario(this.props.match.params.rut, infoUsuario.Email)
  }

  declinarBrindarDatos = () => {
    this.setState({
      redirectHome: true
    })
  }

  otorgarPermisoUsuario = (rut, email) => {
    axios.post('OtorgarPermisoUsuario', {
      Rut: rut,
      EmailCliente: email,
    })
      .then(({ data }) => {
        if (data.message == "true") {
          this.closeModalPermiso()
        } else {
          this.closeModalPermiso()
          console.log("se ve que no se pudo agregar la permiso")
        }
      })
  }

  // getCatergoriasProductos = () => {
  //   axios
  // }

  getProductos = (rut, index) => {
    // axios.get('ObtenerProductos', {
    //   params: {
    //     rut: rut,
    //     index: index
    //   }
    // })
    axios.get('ListarProductos', {
      params: {
        rut: rut
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            productos: data.productos
          });
        } else {
          console.log("se ve que no se pudieron obtener los productos")
        }
      })
  }

  verProducto = () => {
    console.log("ver Producto");
    //  redirija a la pagina de productos
  }

  agregarAlCarrito = () => {
    console.log("agregar al carrito");
  }

  render() {
    const { match } = this.props;

    if (this.state.redirectLogin) {
      return <Redirect to={'/login'} />
    } else if (this.state.redirectHome) {
      return <Redirect to={'/homecliente'} />
    }

    return (
      <div>

        <Modal
          isOpen={this.state.openModalPermiso}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="mdal Permiso"
        >
          <h2>Para comprar en este sitio debes permitir a la empresa acceder a tu informacion</h2>
          <button className="button-normal" onClick={this.aceptarBrindarDatos}>Aceptar</button>
          <button className="button-normal" onClick={this.declinarBrindarDatos}>Declinar</button>
        </Modal>
        <h1>holaaaa soy empresa</h1>
        <h2>{match.params.rut}</h2>
        {this.state.productos && <ListProductos
          productos={this.state.productos}
        // verProducto={this.verProducto}
        // agregarAlCarrito={this.agregarAlCarrito}
        />}
      </div>

    )
  }
}
export default Empresa

const customStyles = {
  content: {
    width: '60vw',
    height: '30vh',
    margin: 'auto',
    overflow: 'visible'

  }
};