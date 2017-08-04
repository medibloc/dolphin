import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

import {NavBarContainer} from './components/NavBar'
import {MainContainer} from './components/Main'
import {SetupContainer} from './components/Setup'
import {LoginContainer} from './components/Login'
import {SearchHistoriesContainer} from './components/SearchHistories'
import {MyProfileContainer} from './components/MyProfile'
import {MyHistoriesContainer} from './components/MyHistories'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBarContainer />
          <Route exact path='/' component={MainContainer} />
          <Route path='/setup' component={SetupContainer} />
          <Route path='/login' component={LoginContainer} />
          <Route path='/search_histories' component={SearchHistoriesContainer} />
          <Route path='/my_profile' component={MyProfileContainer} />
          <Route path='/my_histories' component={MyHistoriesContainer} />
        </div>
      </Router>
    )
  }
}

export default App
