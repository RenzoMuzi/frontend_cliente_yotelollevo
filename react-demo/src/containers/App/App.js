import React, { Component } from 'react'
import { render } from 'react-dom';
import Routes from '../../routes'
import Login from '../Login/Login';

// ========================================

class App extends Component {
  // componentDidMount() {
  //   this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`)
  // }

  // loadScript = (url) => {
  //   const index = window.document.getElementsByTagName("script")[0]
  //   var script = window.document.createElement("script")
  //   script.src = url
  //   script.async = true
  //   script.defer = true
  //   index.parentNode.insertBefore(script, index)
  // }

  render() {
    return (<Routes/>)
  }
}

export default App