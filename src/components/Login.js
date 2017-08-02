import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {email: ''}
  }

  componentWillUpdate(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/')
    }
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <p>Login Succeeded.</p>
            <button className='btn btn-primay'
              onClick={() => this.props.history.push('/')}
              >Go to Home</button>
          </div>
        </div>
      )
    }
    else if (this.props.loginRequested === true) {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            Requested Login. Verify on your MediBloc Mobile App.
          </div>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <h3 style={{marginBottom: '40px'}}>Login</h3>
            <div className='form-group'>
              <input type="text"
                value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && !!this.state.textInput) {
                    this.props.requestLogin(this.state.email)
                  }
                }}
                className='form-control'
                placeholder='Your Email Address' />
            </div>
            <button className='btn btn-primary pull-right'
              disabled={!this.state.email}
              onClick={() => this.props.requestLogin(this.state.email)}>
              Request Login
            </button>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loginRequested: state.get('loginRequested'),
    loggedIn: state.get('loggedIn')
  }
}

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators
)(Login)

export default Login
