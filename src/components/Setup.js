import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export class Setup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ctrMap: '',
      historyMap: '',
      profiles: '',
      doctors: '',
      token: '',
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-6 col-md-offset-3'>
          <input type="text"
            value={this.state.ctrMap}
            onChange={(event) => this.setState({ctrMap: event.target.value})}
            className='form-control'
            placeholder='ctrMap Address' />
          <input type="text"
            value={this.state.historyMap}
            onChange={(event) => this.setState({historyMap: event.target.value})}
            className='form-control'
            placeholder='historyMap Address' />
          <input type="text"
            value={this.state.profiles}
            onChange={(event) => this.setState({profiles: event.target.value})}
            className='form-control'
            placeholder='profiles Address' />
          <input type="text"
            value={this.state.doctors}
            onChange={(event) => this.setState({doctors: event.target.value})}
            className='form-control'
            placeholder='doctors Address' />
          <input type="text"
            value={this.state.token}
            onChange={(event) => this.setState({token: event.target.value})}
            className='form-control'
            placeholder='token Address' />
          <button className='btn btn-primary'
            disabled={!this.state.ctrMap ||
              !this.state.historyMap ||
              !this.state.profiles ||
              !this.state.doctors ||
              !this.state.token
            }
            onClick={() => {
              this.props.setup(
                this.state.ctrMap,
                this.state.historyMap,
                this.state.profiles,
                this.state.doctors,
                this.state.token
              )
              this.props.history.push('/')
            }}>
            Setup Addresses
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loginRequested: state.get('loginRequested'),
    loggedIn: state.get('loggedIn')
  }
}

export const SetupContainer = connect(
  mapStateToProps,
  actionCreators
)(Setup)

export default Setup
