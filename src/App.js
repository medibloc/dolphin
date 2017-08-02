import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

import {NavBar} from './components/NavBar'
import {MainContainer} from './components/Main'
import {SetupContainer} from './components/Setup'
import {LoginContainer} from './components/Login'
import {MyProfileContainer} from './components/MyProfile'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path='/' component={MainContainer} />
          <Route path='/setup' component={SetupContainer} />
          <Route path='/login' component={LoginContainer} />
          <Route path='/my_profile' component={MyProfileContainer} />
        </div>
      </Router>
    )
  }
}

export default App
