import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import {Profile} from './Profile'

export class MyProfile extends React.PureComponent {
  componentDidMount() {
    if (this.props.loggedIn !== true) {
      this.props.history.push('/login')
    } else if (Object.keys(this.props.profile).length === 0) {
      this.props.getProfile(this.props.email, this.props.account, this.props.priKey)
    }
  }

  render() {
    if (Object.keys(this.props.profile).length === 0) {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <h3>Loading Profile...</h3>
          </div>
        </div>
      )
    } else {
      return (
        <Profile profile={this.props.profile} balance={this.props.balance} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    contracts: state.get('contracts').toJS(),
    web3: state.get('web3'),
    account: state.get('account'),
    email: state.get('email'),
    priKey: state.get('priKey'),
    profile: state.get('profile').toJS(),
    balance: state.get('balance'),
    loggedIn: state.get('loggedIn')
  }
}

export const MyProfileContainer = connect(
  mapStateToProps,
  actionCreators
)(MyProfile)

export default MyProfile
