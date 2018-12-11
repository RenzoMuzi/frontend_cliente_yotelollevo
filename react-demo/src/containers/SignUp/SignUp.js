import React, { Component } from 'react'
import Modal from 'react-modal'
import Aux from '../../hoc/Auxiliar'
import axio from '../../services/api/api'

import {Redirect, Link} from 'react-router-dom'

Modal.setAppElement('#root');

class SignUp extends Component {
    state = {
        modalIsOpen: false,
        nombreUsuario: '',
        emailUsuario: '',
        claveUsuario: '',
        fotoUsuario: 'https://res.cloudinary.com/dnieertcs/image/upload/v1541794697/Profile-Default.jpg',
    }

    signUp = (nombreUsuario, emailUsuario, claveUsuario, fotoUsuario) => {
      if ((emailUsuario !== '')&&(claveUsuario !== '')&&(nombreUsuario)&&(fotoUsuario !== '')) {
        axio.post('RegistrarCliente', {       ///aca cambiar el /post por algo asi como /signin
          Nombre: nombreUsuario,
          Email: emailUsuario,
          Clave: claveUsuario,
          Foto: fotoUsuario
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.openModal();
          } else {
            console.log("error al registrarse")
          }
        })
      }
    }

    submitLoginHandler = (e) => {
      e.preventDefault();
      const {nombreUsuario, emailUsuario, claveUsuario, fotoUsuario} = this.state;
      this.signUp(nombreUsuario, emailUsuario, claveUsuario, fotoUsuario);
    }

    changeInputHandler = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }
    
    openModal = () => {
      this.setState({modalIsOpen: true});
    }
   
    closeModal = () => {
      if (this.state.modalIsOpen) {
        this.setState({modalIsOpen: false});
      }
    }

    closeModalAndRedirect = (e) => {
      this.closeModal();
      this.props.mostrarRegistro(e);
    }
     
    render(){
        return(
            <Aux>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2>Confirma el registro en tu casilla de correo: {this.state.emailUsuario}</h2>
                <button onClick={this.closeModalAndRedirect}>close</button>
              </Modal>

              <h1>Registrarse</h1>
              <form onSubmit={(e) => this.submitLoginHandler(e)}>
                <label>Nombre de Usuario</label>
                <br></br>
                <input 
                    name="nombreUsuario"
                    placeholder="nombre" 
                    type="text"
                    onChange={(e) => this.changeInputHandler(e)}
                />
                <br></br>
                <label>Email de Usuario</label>
                <br></br>
                <input 
                    name="emailUsuario"
                    placeholder="email" 
                    type="email"
                    onChange={(e) => this.changeInputHandler(e)}
                />
                <br></br>
                <label>Clave de Usuario</label>
                <br></br>
                <input 
                    name="claveUsuario"
                    placeholder="clave"
                    type="password"
                    onChange={(e) => this.changeInputHandler(e)}
                />
                <br></br>
                <button type="submit" className="button" onClick={(e) => this.submitLoginHandler(e)}>Registrarse</button>
                <a onClick={(e) => this.props.mostrarRegistro(e)}>Ingresar</a>
              </form>  
            </Aux>
        )
    }
}

export default SignUp;

const customStyles = {
  content : {
      width: '60vw', /*optional*/
      height: '30vh',
      margin: 'auto',
      overflow:'visible'
     
  }
};