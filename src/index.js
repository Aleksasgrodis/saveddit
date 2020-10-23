import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let db;
let request = indexedDB.open('userDB');
request.onerror = function (event) {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function (event) {
  db = event.target.result;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
