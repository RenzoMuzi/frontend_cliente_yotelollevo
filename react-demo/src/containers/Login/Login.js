import React, { PureComponent, Component } from 'react'
import Aux from '../../hoc/Auxiliar'
import postData from '../../services/api/api'
import {Redirect, Link} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import Signup from '../SignUp/SignUp'

class Login extends Component {
    state = {
        emailUsuario: '',
        claveUsuario: '',
        redirect: false,
        registrarse: false
    }

    componentClicked = () => console.log('aprete el componente de fb');

    responseFacebook = response => {
      console.log(response);
      if (response.hasOwnProperty('email')) {
        sessionStorage.setItem('infoUsuario', response);
        this.setState({ redirect: true })
      } else {
        console.log("error al loguearse")
      }
    };

    login = (emailUsuario,claveUsuario) => {
      if ((emailUsuario !== '')&&(claveUsuario !== '')) {
        postData('/Client/IniciarSesion', {
          email: emailUsuario,
          clave: claveUsuario
        })
        .then((res) => {
          console.log(res.data)
          if (res.status === 201) {
            sessionStorage.setItem('infoUsuario', res.data);
            this.setState({ redirect: true })
          } else {
            console.log("error al loguearse")
          }
        })
      }
    }

    submitLoginHandler = (e) => {
      e.preventDefault();
      const {emailUsuario, claveUsuario} = this.state;
      this.login(emailUsuario, claveUsuario);
    }

    changeInputHandler = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }
    
    toggleRegistro = (e) => {
      e.preventDefault();
      this.setState( { registrarse : !this.state.registrarse });
    }

    render(){
        if (this.state.redirect) {
          return <Redirect to={'/homecliente'} /> ///cambiarlo por /homecliente
        }
        if (sessionStorage.getItem('infoUsuario')) {
          return <Redirect to={'/homecliente'} /> ///cambiarlo por /homecliente
        }

        return(
            <Aux>
            {
              this.state.registrarse 
            ?
            <Aux>
            <div className="loginsignupWrapper"> 
              <div className="imgLogin">
                <picture>
                  <img src="src\assets\package.png" alt="Package" />
                </picture>
              </div>

              <div className="centered loginsignupContainer">
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
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    textButton="Ingresar con Facebook"
                  />
                  <a onClick={(e) => this.props.mostrarRegistro(e)}>Registrase</a>
                </Aux>
             
              </div>
            </div>
            
             
            </Aux>
            :
              <Signup 
                mostrarRegistro={this.toggleRegistro}
              />
            } 
            </Aux>
              
           
        )
    }
}

export default Login;