import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export class Main extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.loggedIn !== true) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        Hi
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.get('loggedIn')
  }
}

export const MainContainer = connect(
  mapStateToProps,
  actionCreators
)(Main)

export default Main
