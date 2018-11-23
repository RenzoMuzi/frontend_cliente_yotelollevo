import React, { Component } from 'react'
import { render } from 'react-dom';
import Routes from '../../routes'
import Login from '../Login/Login';

// ========================================

class App extends Component {
  render() {
    return (<Routes/>)
  }
}

export default App