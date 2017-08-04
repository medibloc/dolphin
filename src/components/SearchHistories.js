import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export class SearchHistories extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {disease: '', prescription: ''}
  }

  componentDidMount() {
    if (this.props.loggedIn !== true) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-6 col-md-offset-3'>
          <div className='row'>
            <h3 style={{marginBottom: '30px'}}>Search</h3>
            <div className='form-group'>
              <input type="text"
                value={this.state.disease}
                onChange={(event) => this.setState({disease: event.target.value})}
                className='form-control'
                placeholder='Disease' />
            </div>
            <div className='form-group'>
              <input type="text"
                value={this.state.prescription}
                onChange={(event) => this.setState({prescription: event.target.value})}
                className='form-control'
                placeholder='Prescription' />
            </div>
            <button className='btn btn-primary pull-right'
              disabled={!this.state.disease &&
                !this.state.prescription &&
                !this.state.symptom}
              onClick={() => this.props.searchHistories(this.state)}>
              Search
            </button>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              {this.props.searchResults.map((e) =>
                <div
                  key={e._id}
                  className='row'>
                  Disease: {e.disease}<br />
                  Prescription: {e.prescription}<br />
                  Date: {e.date}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.get('loggedIn'),
    searchResults: state.getIn(['search', 'results']).toJS()
  }
}

export const SearchHistoriesContainer = connect(
  mapStateToProps,
  actionCreators
)(SearchHistories)

export default SearchHistories
