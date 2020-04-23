import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './app/App'
// import { Provider } from 'react-redux';
// import { History } from 'history';
// import { identity } from 'ramda';
import * as serviceWorker from './serviceWorker';
// import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import Routes from './components/routes';

const createApp = (config, history) => {
  const initialStore = {
    entities: {
      config,
    },
  };


  return (
          <Routes />
  );
};

const loadApp = (config) => {
  return createApp();
};

const renderApp = (elementId, config, basePath) => {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`failed getting element ${elementId}`);
    return;
  }

  render(loadApp(), el);
};

class Agency365Search {
  renderSearch = renderApp;

  constructor() {
    // TODO what is this???
    if (!(this instanceof Agency365Search)) {
      return new Agency365Search();
    }
  }
}
window.Agency365Search = Agency365Search;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
