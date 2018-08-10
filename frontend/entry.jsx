import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
// import * as ApiUtil from './util/session_api_util';

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

  // const store = configureStore();
  ReactDOM.render(<Root store={store}/>, root);
  // window.login = ApiUtil.login;
  // window.logout = ApiUtil.logout;
  // window.signup = ApiUtil.signup;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});
