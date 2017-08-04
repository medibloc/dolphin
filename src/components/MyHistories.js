import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import {Histories} from './Histories'

export class MyHistories extends React.PureComponent {
  componentDidMount() {
    if (this.props.loggedIn !== true) {
      this.props.history.push('/login')
    } else {
      this.props.getHistories(this.props.email, this.props.account, this.props.priKey)
    }
  }

  render() {
    if (this.props.histories.length === 0) {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <h3>No History</h3>
          </div>
        </div>
      )
    } else {
      return (
        <Histories histories={this.props.histories} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    account: state.get('account'),
    email: state.get('email'),
    priKey: state.get('priKey'),
    loggedIn: state.get('loggedIn'),
    histories: state.get('histories').toJS()
  }
}

export const MyHistoriesContainer = connect(
  mapStateToProps,
  actionCreators
)(MyHistories)

export default MyHistories
