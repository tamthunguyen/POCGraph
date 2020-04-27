import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './app/App'
import * as serviceWorker from './serviceWorker';
import Routes from './components/routes';

const createApp = (config, history) => {
  return (
          <Routes />
  );
};


const renderApp = (elementId, config, basePath) => {
  const el = document.getElementById(elementId);
  if (!el) { 
    console.error(`failed getting element ${elementId}`);
    return;
  }

  render(createApp(), el);
};

class Agency365Search {
  renderSearch = renderApp;

  constructor() {
    // check if instance exist in this
    if (!(this instanceof Agency365Search)) {
      return new Agency365Search();
    }
  }
}
window.Agency365Search = Agency365Search;

// Main application render
const ui = <App />
const container = document.getElementById('root');
if(container) render(ui, container);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
