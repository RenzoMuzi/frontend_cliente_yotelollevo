import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

import axios from '../../services/api/api'
import Modal from 'react-modal'

Modal.setAppElement('#root');

class Carrito extends Component {
  state = {
    carrito: {},
    fetchData: false,
    modalIsOpen: false,
    messageModal: ''
  }

  componentDidMount() {
    this.verCarritoCliente(this.props.emailCliente, this.props.rut)
  }

  verCarritoCliente = (email, rut) => {
    axios.post('VerCarritodeCliente', {
      EmailCliente: email,
      Rut: rut
    })
      .then(({ data }) => {
        if (data.status == 200) {
          console.log(data.carrito);
          this.setState({
            carrito: data.carrito,
            fetchData: true
          })
        } else {
          console.log("se ve que no se pudo ver el carrito")
        }
      })
  }

  pagarCarrito = (email, rut, transaccionPaypal) => {
    axios.post('PagarCarrito', {
      EmailCliente: email,
      Rut: rut,
      TransaccionPaypal: transaccionPaypal
    })
      .then(({ data }) => {
        if (data.status == 200) {
          this.setState({
            messageModal: "Realizado"
          }, () => {
            this.openModal();
            setTimeout(() => { this.closeModal() }, 2000);
          })
        } else {
          console.log("se ve que no se pudo ingresar el pago a nuestro sistema")
        }
      })
  }


  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  render() {
    let total = 0;
    const client = {
      sandbox: 'ATO-HaubGjfhdI_TKQiVMjOElb8FAwdJtS-xFSLce7k2AKg7Gx0hKWlz8KVlIlLITGHXGsVjTpl4EbpB',
    };

    let env = 'sandbox';
    let currency = 'USD';

    const onSuccess = (payment) => {
      console.log('Successful payment!', payment);
      this.pagarCarrito(this.props.emailCliente, this.props.rut, payment.paymentID);
    }

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) => {
      console.log('Cancelled payment!', data);
      // this.setState({
      //   messageModal: "Cancelado"
      // })
      // this.pagarCarrito(this.props.emailCliente, this.props.rut, "idpaypal");

      this.openModal();
      setTimeout(() => { this.closeModal() }, 2000);
    }

    return (

      <div className="wrapper-carrito">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="ModalCarrito"
        >
          <h3>PAGO</h3>
          <h2>{this.state.messageModal}</h2>
        </Modal>
        <h2>Detalle: </h2>
        {this.state.fetchData
          &&
          <div>
            <div className="row-carrito">
              <div>Imagen</div>
              <div>Producto</div>
              <div>Cantidad</div>
              <div>Sub Total</div>
            </div>
            {this.state.carrito.Productos.map(prod => {
              total += prod.Cantidad * prod.PropProducto.Precio
              return (
                <div key={prod.ObjectId} className="row-carrito">
                  <div className="wrapper-imagen-carrito">
                    <img src={prod.Imagenes} />
                  </div>

                  <div>
                    {prod.PropProducto.Nombre}
                  </div>

                  <div>
                    {prod.Cantidad}
                  </div>

                  <div>
                    {prod.PropProducto.Precio}
                  </div>
                </div>)
            })}

          </div>}
        <div className="total-paypal">
          <div>
            Total: USD {total}
          </div>
          <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        </div>
      </div>
    )
  }

}

export default Carrito

const customStyles = {
  content: {
    width: '60vw',
    height: '30vh',
    margin: 'auto',
    overflow: 'visible'
  }
};

