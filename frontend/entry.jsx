import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
// import * as ApiUtil from './util/session_api_util';
import * as RouteApiUtil from './util/route_api_util';
import * as RouteActions from './actions/route_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store}/>, root);

  window.fetchRoute = RouteActions.fetchRoute;
  window.fetchRoutes = RouteActions.fetchRoutes;
  window.createRoute = RouteActions.createRoute;

  window.getState = store.getState;
  window.dispatch = store.dispatch;
});
