import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { setUser } from './actions/userAction'
import axios from './config/axios'

const store = configureStore();

console.log(store.getState());
const ele = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);
if (localStorage.getItem('token')) {
  axios.get('/account', {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  })
    .then(response => {
      const user = response.data
      store.dispatch(setUser(user))
    })
}

ReactDOM.render(ele, document.getElementById("root"));
