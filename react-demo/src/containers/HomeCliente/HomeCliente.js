import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Aux from '../../hoc/Auxiliar'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'

import GeoLocationComponent from '../GeoLocationComponent/GeoLocationComponent'

class HomeCliente extends Component {
	state = {
		redirect: false,
		emailCliente: "",
		nombreCliente: "",
		fotoCliente: ""
	}

	componentWillMount() {
		if (sessionStorage.getItem('infoUsuario')) {
			var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
			this.setState({
				emailCliente: infoUsuario.Email,
				nombreCliente: infoUsuario.Nombre,
				fotoCliente: infoUsuario.Foto
			})
		} else {
			this.setState({ redirect: true })
		}
	}

	logout = () => {
		sessionStorage.setItem('infoUsuario', '');
		sessionStorage.clear();
		this.setState({ redirect: true })
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to={'/login'} />)
		}

		//aca hacer lo mismo de redirect con empresa

		return (
			<div className="homeClientWrapper">
				<HeaderComponent 
					emailCliente={this.state.emailCliente}
					nombreCliente= {this.state.nombreCliente}
					fotoCliente={this.state.fotoCliente} 
					logout={this.logout}
				/>
				<GeoLocationComponent 
					emailCliente={this.state.emailCliente}
					nombreCliente={this.state.nombreCliente}
					fotoCliente={this.state.fotoCliente}
				/>
			</div>
		)
	}
}

export default HomeCliente