import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from './containers/Login/Login'
import SignUp from './containers/SignUp/SignUp'
import NotFound from './components/NotFound/NotFound'
import HomeCliente from './containers/HomeCliente/HomeCliente'
import ClientProfile from './containers/ClientProfile/ClientProfile'
import Empresa from './containers/Empresa/Empresa'

const Routes = () => (
  <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/homecliente" component={HomeCliente}/>
      <Route exact path='/perfilCliente' component={ClientProfile}/>
      <Route path='/empresa' component={Empresa} />
      <Route exact path="*" component={NotFound}/>
      
    </Switch>
  </BrowserRouter>
);

export default Routes