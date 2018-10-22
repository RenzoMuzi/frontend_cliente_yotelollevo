import React, { PureComponent, Component } from 'react'
import Aux from '../../hoc/Auxiliar'
import postData from '../../services/api/api'
import {Redirect} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

class Login extends Component {
    state = {
        emailUsuario: '',
        claveUsuario: '',
        redirect: false
    }

    login = (emailUsuario,claveUsuario) => {
      if ((emailUsuario !== '')&&(claveUsuario !== '')) {
        postData('/posts', {
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
    

    render(){
        if (this.state.redirect) {
          return <Redirect to={'/homecliente'} /> ///cambiarlo por /homecliente
        }
        if (sessionStorage.getItem('infoUsuario')) {
          return <Redirect to={'/homecliente'} /> ///cambiarlo por /homecliente
        }

        return(
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
                <button type="submit" onClick={(e) => this.submitLoginHandler(e)}>Ingresar</button>
                <a href='/signup'>Registrarse</a>
              </form> 
                { /*
                    <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                />
                <Registrarse />
                */ }
                
            </Aux>
        )
    }
}

export default Login;