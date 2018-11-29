import React, { Component } from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

import axios from '../../services/api/api'
import ListProductos from '../../components/ListProductos/ListProductos'
import HeaderEmpresa from '../../components/HeaderEmpresa/HeaderEmpresa'
import Carrito from '../../components/Carrito/Carrito'

Modal.setAppElement('#root');

class Empresa extends Component {
  state = {
    permitido: false,
    redirectLogin: false,
    redirectHome: false,
    openModalPermiso: false,
    /////////
    productos: [],
    productoActual: {},
    paginasProducto: 0,
    ////////
    vistaCarrito: false,
    carrito: {},
    carritoUpdates: false,
    // categoriasProductos: [], ver si va o no
    nombreEmpresa: "",
    fotoEmpresa: "",
    nombreCliente: "",
    fotoCliente: "",
    emailCliente: ""
  }

  componentDidMount() {
    this.verEmpresa(this.props.match.params.rut);
    if (sessionStorage.getItem('infoUsuario')) {
      var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
      this.verInfoCLiente(infoUsuario.Email);
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
        Rut: rut
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            nombreEmpresa: data.empresa.Nombre,  //cambiar por data.NombreEmpresa
            fotoEmpresa: data.empresa.Logo //cambiar por data.FotoEmpresa pero facu dijo que es un array o sea que seria tipo data.empresas[0].foto
          })
        } else {
          console.log("se ve que no se pudo obtener datos de la empresa");
        }

      })
  }

  verInfoCLiente = (email) => {
    axios.get('VerInfoCliente', {
      params: {
        email: email
      }
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            nombreCliente: data.cliente.Nombre,
            emailCliente: data.cliente.Email,
            fotoCliente: data.cliente.Foto
          })
        } else {
          console.log("parece que no se pudo obtener la info del cliente")
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

  volverYateLoLLevo = () => {
    this.setState({
      redirectHome: true
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

  verCarrito = (email, rut) => {
    this.setState({
      vistaCarrito: !this.state.vistaCarrito
    }, () => {
        axios.post('VerCarritodeCliente', {
          EmailCliente: email,
          Rut: rut
        })
          .then(({ data }) => {
            console.log(data);
          })
      })
  }

  agregarAlCarrito = (email, rut, idProduct, cantidad) => {
    axios.post('AgregarProductoCarrito', {
      Email: email,
      Rut: rut,
      IdProduct: idProduct,
      Cantidad: cantidad
    })
      .then(({ data }) => {
        if (data.status == 200) {

          console.log('se agrego el producto al carrito');
          this.setState({
            carritoUpdates: true
          })
        } else {
          console.log('se ve que no se pudo agregar el producto al carrito');
        }
      })
  }



  render() {
    const { match } = this.props;

    if (this.state.redirectLogin) {
      return <Redirect to={'/login'} />
    } else if (this.state.redirectHome) {
      return <Redirect to={'/homecliente'} />
    }

    return (
      <div className="homeClientWrapper">
        <HeaderEmpresa
          rut={this.props.match.params.rut}
          nombreEmpresa={this.state.nombreEmpresa}
          fotoEmpresa={this.state.fotoEmpresa}
          fotoCliente={this.state.fotoCliente}
          nombreCliente={this.state.nombreCliente}
          volverYateLoLLevo={this.volverYateLoLLevo}
          verCarrito={this.verCarrito}
        />
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

        {this.state.vistaCarrito
          ?
          <Carrito carrito={this.state.carrito}/>
          :
          <div>
            <h1>holaaaa soy empresa</h1>
            <h2>{match.params.rut}</h2>
            {this.state.productos &&
              <ListProductos
                productos={this.state.productos}
                // verProducto={this.verProducto}
                agregarAlCarrito={this.agregarAlCarrito}
                email={this.state.emailCliente}
                rut={this.props.match.params.rut}
              />}
          </div>
        }



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