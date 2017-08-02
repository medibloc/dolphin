import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import contracts from '../contracts.json'

export class Setup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ctrMap: '',
      historyMap: '',
      profiles: '',
      doctors: '',
      mediBlocToken: '',
    }
  }

  componentDidMount() {
    if (this.props.contracts.ctrMap !== undefined) {
      this.setState({
        ctrMap: this.props.contracts.ctrMap.address,
        historyMap: this.props.contracts.historyMap.address,
        profiles: this.props.contracts.profiles.address,
        doctors: this.props.contracts.doctors.address,
        mediBlocToken: this.props.contracts.mediBlocToken.address,
      })
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
            value={this.state.ctrMap}
            onChange={(event) => this.setState({ctrMap: event.target.value})}
            className='form-control'
            placeholder='CtrMap Address' />
          <input type="text"
            value={this.state.historyMap}
            onChange={(event) => this.setState({historyMap: event.target.value})}
            className='form-control'
            placeholder='HistoryMap Address' />
          <input type="text"
            value={this.state.profiles}
            onChange={(event) => this.setState({profiles: event.target.value})}
            className='form-control'
            placeholder='Profiles Address' />
          <input type="text"
            value={this.state.doctors}
            onChange={(event) => this.setState({doctors: event.target.value})}
            className='form-control'
            placeholder='Doctors Address' />
          <input type="text"
            value={this.state.mediBlocToken}
            onChange={(event) => this.setState({mediBlocToken: event.target.value})}
            className='form-control'
            placeholder='MediBlocToken Address' />
          <button className='btn btn-primary'
            disabled={!this.state.ctrMap ||
              !this.state.historyMap ||
              !this.state.profiles ||
              !this.state.doctors ||
              !this.state.mediBlocToken
            }
            onClick={() => {
              this.props.setup(
                this.state.ctrMap,
                this.state.historyMap,
                this.state.profiles,
                this.state.doctors,
                this.state.mediBlocToken
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
    loggedIn: state.get('loggedIn'),
    contracts: state.get('contracts').toJS()
  }
}

export const SetupContainer = connect(
  mapStateToProps,
  actionCreators
)(Setup)

export default Setup
