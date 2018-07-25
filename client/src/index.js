import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
