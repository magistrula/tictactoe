// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';
import history from 'utils/history';
import configureStore from './configureStore';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const MOUNT_NODE = document.getElementById('app');

const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);
