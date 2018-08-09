import React from 'react';

import { Provider } from 'react-redux';
import {Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';

import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import NavbarContainer from './navbar/navbar_container';

const App = () => (
  <div>
    <header>
      <h1>Perestrava</h1>
      <NavbarContainer />
    </header>

    <Route path="/login" component={LoginFormContainer} />
    <Route path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;
