import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';

import App from './components/App';
import Home from './containers/HomeContainer';
import Signup from './containers/SignupContainer';
import Login from './containers/LoginContainer';

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Redirect path="*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('app')
);