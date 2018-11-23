import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Auxiliar'

import GeoLocationComponent from '../GeoLocationComponent/GeoLocationComponent'

class HomeCliente extends Component {
	state = {
		redirect: false,
		emailCliente: "",
		nombreCliente: ""
	}

	componentDidMount() {
		if (sessionStorage.getItem('infoUsuario')) {
			var infoUsuario = JSON.parse(sessionStorage.getItem('infoUsuario'));
			this.setState({
				emailCliente: infoUsuario.email,
				nombreCliente: infoUsuario.name
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

		return (
			<div className="homeClientWrapper">
				<h1>Soy Home Cliente</h1>
				<GeoLocationComponent />
				<button type='button' onClick={this.logout}>Salir</button>
			</div>
		)
	}
}

export default HomeCliente