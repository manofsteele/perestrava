import React from 'react';

import { Provider } from 'react-redux';
import {Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';

import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import NavbarContainer from './navbar/navbar_container';
import MainNavbar from './main_navbar/main_navbar';
import RouteCreatorContainer from './routes/route_creator_container';
import RouteIndexContainer from './routes/route_index_container';
import RouteBuilderNavBar from './routes/route_builder_navbar';
import Footer from './footer/footer';
import Empty from './empty';
import NotFound from './not_found';
import Splash from './splash';

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="mainPage">
    <header>
      <Switch>
        <AuthRoute exact path="/login" component={NavbarContainer } />
        <AuthRoute exact path="/signup" component={NavbarContainer } />
        <ProtectedRoute exact path="/routes/new" component={RouteBuilderNavBar} />
        <ProtectedRoute exact path="/routes/index" component={MainNavbar} />
        <Route exact path="/" component={NavbarContainer} />
        <Route exact path="/not_found" component={NavbarContainer} />
      </Switch>
    </header>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/routes/new" component={RouteCreatorContainer} />
      <ProtectedRoute exact path="/routes/index" component={RouteIndexContainer} />
      <Route exact path="/" component={Splash} />
      <Route exact path="/not_found" component={NotFound} />
      <Redirect to="/not_found" />
    </Switch>
    <footer>
      <Switch>
        <ProtectedRoute exact path="/routes/new" component={Empty} />
        <Route path="/" component={Footer} />
      </Switch>
    </footer>
  </div>
);

export default App;
