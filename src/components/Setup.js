import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import contracts from '../contracts.json'

export class Setup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      CtrMap: '',
      HistoryMap: '',
      Profiles: '',
      Doctors: '',
      MediBlocToken: '',
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-6 col-md-offset-3'>
          <button
            className='btn btn-warning'
            onClick={() => this.setState(contracts)}
            >Read from file</button>
          <input type="text"
            value={this.state.CtrMap}
            onChange={(event) => this.setState({CtrMap: event.target.value})}
            className='form-control'
            placeholder='CtrMap Address' />
          <input type="text"
            value={this.state.HistoryMap}
            onChange={(event) => this.setState({HistoryMap: event.target.value})}
            className='form-control'
            placeholder='HistoryMap Address' />
          <input type="text"
            value={this.state.Profiles}
            onChange={(event) => this.setState({Profiles: event.target.value})}
            className='form-control'
            placeholder='Profiles Address' />
          <input type="text"
            value={this.state.Doctors}
            onChange={(event) => this.setState({Doctors: event.target.value})}
            className='form-control'
            placeholder='Doctors Address' />
          <input type="text"
            value={this.state.MediBlocToken}
            onChange={(event) => this.setState({MediBlocToken: event.target.value})}
            className='form-control'
            placeholder='MediBlocToken Address' />
          <button className='btn btn-primary'
            disabled={!this.state.CtrMap ||
              !this.state.HistoryMap ||
              !this.state.Profiles ||
              !this.state.Doctors ||
              !this.state.MediBlocToken
            }
            onClick={() => {
              this.props.setup(
                this.state.CtrMap,
                this.state.HistoryMap,
                this.state.Profiles,
                this.state.Doctors,
                this.state.MediBlocToken
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
