import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

import {MainContainer} from './components/Main'
import {SetupContainer} from './components/Setup'
import {LoginContainer} from './components/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={MainContainer} />
          <Route path='/setup' component={SetupContainer} />
          <Route path='/login' component={LoginContainer} />
        </div>
      </Router>
    )
  }
}

export default App
