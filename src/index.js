import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// import browser router dr reactrouterdom
import { BrowserRouter } from 'react-router-dom'

// import createstore dari redux
import { createStore } from 'redux'

// import provide dari reactredux
import { Provider } from 'react-redux';

// import combine reducers disini
import allReducers from './reducer'

// buat variabel u/ globalstate
const globalState = createStore (allReducers)

// subscribe variabel globalState u/ console.log redux setiap kali react nya dipanggil
globalState.subscribe(() => console.log('Global State : ', globalState.getState()))

ReactDOM.render(
  <Provider store= {globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
