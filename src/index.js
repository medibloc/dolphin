import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import io from 'socket.io-client'
import reduxLogger from 'redux-logger'
import remoteActionMiddleware from './remote_action_middleware'
import reducer from './reducer'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {checkLoginStatus} from './action_creators'
import 'bootstrap/dist/css/bootstrap.min.css'

const socket = io(`${window.location.protocol}//${window.location.hostname}:7080`)
const createStoreWithMiddleware = applyMiddleware(
  reduxLogger, remoteActionMiddleware(socket)
)(createStore)
const store = createStoreWithMiddleware(reducer)

socket.on('state', (state) => {
  console.log(state)
  store.dispatch(checkLoginStatus(state))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
