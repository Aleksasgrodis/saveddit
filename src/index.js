import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
// STORE - GLOBALIZED STATE

// // ACTION -

// const addCode = code => {
//   return {
//     type: 'ADD_CODE',
//     code
//   };
// };
// const getCode = () => {
//   return {
//     type: 'GET_CODE',
//   };
// };
// const addToken = token => {
//   return {
//     type: 'ADD_TOKEN',
//     token
//   };
// };
// const getToken = () => {
//   return {
//     type: 'GET_TOKEN',
//   };
// };
// const getUsername = () => {
//   return {
//     type: 'GET_USERNAME',
//   };
// };
// const addUsername = username => {
//   return {
//     type: 'ADD_USERNAME',
//     username
//   };
// };
// const logout = () => {
//   return {
//     type: 'LOG_OUT',
//   };
// };
// const login = () => {
//   return {
//     type: 'LOG_IN',
//   };
// };
// // REDUCER
// const reddittor = (state = {}, action) => {
//   switch (action.type) {
//     case 'LOG_IN':
//       return state + 1;
//     case 'LOG_OUT':
//       return state - 1;
//     case 'ADD_CODE':
//       return {...state, code: action.code }
//     case 'GET_CODE':
//       return state - 1;
//     case 'ADD_TOKEN':
//       return {...state, token: action.token }
//     case 'GET_TOKEN':
//       return state - 1;
//     case 'ADD_USERNAME':
//       return {...state, username: action.username }
//     case 'GET_USERNAME':
//       return state - 1;
//     default:
//       return state;
//   }
// };

// let store = createStore(
//   reddittor,
//   null,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

// store.subscribe(() => console.log(store.getState()));
// // DISPATCH
// store.dispatch(addCode('asds'));
// store.dispatch(addToken('asd32s'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
