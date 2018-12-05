import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliar'
import axio from '../../services/api/api'
import { Redirect, Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import Signup from '../SignUp/SignUp'

class Login extends Component {
  state = {
    emailUsuario: '',
    claveUsuario: '',
    redirect: false,
    registrarse: false
  }

  componentDidMount = () => {
    if (sessionStorage.getItem('infoUsuario')) {
      this.setState({ redirect: true });
    }
  }

  responseFacebook = response => {
    if (response.hasOwnProperty('email')) {
      const datosUsuario = {
        Email: response.email,
        Nombre: response.name,
        Foto: response.picture.data.url,
        IdFacebook: response.userID
      };
      /// borrar esto, es para que ya te redirija a la pagina de usuario
      // sessionStorage.setItem('infoUsuario', JSON.stringify(datosUsuario));
      /////
      axio.post('IniciarSesionPorFacebook', datosUsuario)
        .then((res) => {
          if (res.data.status == 200) {
            datosUsuario["Token"] = res.data.message;
            sessionStorage.setItem('infoUsuario', JSON.stringify(datosUsuario));

            if (sessionStorage.getItem('infoUsuario')) {
              this.setState({ redirect: true });
            }
          }
        })

    } else {
      console.log("error al loguearse")
    }
  };

  login = (emailUsuario, claveUsuario) => {
    if ((emailUsuario !== '') && (claveUsuario !== '')) {
      axio.post('IniciarSesion', {
        email: emailUsuario,
        clave: claveUsuario
      })
        .then((res) => {
          if (res.status == 200) {
            const infoUsuario = {
              Email: emailUsuario,
              Nombre: claveUsuario,
              Token: res.data.message
            } 
            sessionStorage.setItem('infoUsuario', JSON.stringify(infoUsuario));
            if (sessionStorage.getItem('infoUsuario')) {
              this.setState({ redirect: true })
            }
          } else {
            console.log("error al loguearse")
          }
        })
    }
  }

  submitLoginHandler = (e) => {
    e.preventDefault();
    const { emailUsuario, claveUsuario } = this.state;
    this.login(emailUsuario, claveUsuario);
  }

  changeInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleRegistro = (e) => {
    e.preventDefault();
    this.setState({ registrarse: !this.state.registrarse });
  }

  

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/homecliente'} /> ///cambiarlo por /homecliente
    }

    return (
      <div className="loginsignupWrapper">
        <div className="imgLogin">
          <picture>
            <img src="src\assets\package.png" alt="Package" />
          </picture>
        </div>
        <div className="centered loginsignupContainer">
          {
            !this.state.registrarse
              ?
              <Aux>
                <h1>Ingresar</h1>
                <form onSubmit={(e) => this.submitLoginHandler(e)}>
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
                  <button type="submit" className="button" onClick={(e) => this.submitLoginHandler(e)}>Ingresar</button>
                </form>
                <br></br>
                <FacebookLogin
                  appId="1829109587138442"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                  textButton="Ingresar con Facebook"
                  size="metro"
                />
                <a onClick={this.toggleRegistro}>Registrase</a>
              </Aux>
              :
              <Signup
                mostrarRegistro={this.toggleRegistro}
              />
          }
        </div>
      </div>
    )
  }
}

export default Login;