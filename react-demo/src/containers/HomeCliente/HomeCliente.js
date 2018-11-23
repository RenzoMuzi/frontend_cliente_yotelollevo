import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Auxiliar'

import GeoSuggestSearch from '../GeoSuggestSearch/GeoSuggestSearch'

class HomeCliente extends Component {
	state = {
		redirect: false,
	}

	componentDidMount() {
		if (sessionStorage.getItem('infoUsuario')) {
			console.log(sessionStorage.getItem('infoUsuario'))
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
				<GeoSuggestSearch />
				<button type='button' onClick={this.logout}>Salir</button>
			</div>
		)
	}
}

export default HomeCliente