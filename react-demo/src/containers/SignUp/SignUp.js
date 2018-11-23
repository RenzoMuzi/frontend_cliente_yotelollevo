import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliar'
import { postData } from '../../services/api/api'
import {Redirect, Link} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

class SignUp extends Component {
    state = {
        nombreUsuario: '',
        emailUsuario: '',
        claveUsuario: '',
    }

    signUp = (nombreUsuario, emailUsuario, claveUsuario,) => {
      if ((emailUsuario !== '')&&(claveUsuario !== '')&&(nombreUsuario)) {
        postData('/Client/RegistrarCliente', {       ///aca cambiar el /post por algo asi como /signin
          nombre: nombreUsuario,
          email: emailUsuario,
          clave: claveUsuario
        })
        .then((res) => {
          console.log(res.data)
          if (res.status === 200) {
            sessionStorage.setItem('infoUsuario', res.data);
            this.setState({ redirect: true })
          } else {
            console.log("error al registrarse")
          }
        })
      }
    }

    submitLoginHandler = (e) => {
      e.preventDefault();
      const {nombreUsuario, emailUsuario, claveUsuario} = this.state;
      this.signUp(nombreUsuario, emailUsuario, claveUsuario);
    }

    changeInputHandler = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }
    

    render(){
        if (this.state.redirect) {
          return <Redirect to={'/homecliente'} /> 
        }
        if (sessionStorage.getItem('infoUsuario')) {
          return <Redirect to={'/homecliente'} /> 
        }
 
        return(
            <Aux>
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