import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';

import App from './components/App';
import Home from './containers/HomeContainer.js';

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/home" component={Home} />
      <Redirect path="*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('app')
);