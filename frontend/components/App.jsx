import React from 'react';

import { Provider } from 'react-redux';
import {Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';

import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import NavbarContainer from './navbar/navbar_container';

import { AuthRoute } from '../util/route_util';

const App = () => (
  <div className="mainPage">
    <header>
      <NavbarContainer />
    </header>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
