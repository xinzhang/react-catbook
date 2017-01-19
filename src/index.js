/*eslint-disable import/default */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import {loadCats} from './actions/catActions';
import {loadHobbies} from './actions/hobbyActions';

const store = configureStore();
store.dispatch(loadCats());
store.dispatch(loadHobbies());

ReactDOM.render(
  <Provider store ={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
