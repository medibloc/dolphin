import {Map, fromJS} from 'immutable'

export const INITIAL_STATE = fromJS({loggedIn: false})

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SETUP':
      return state.set('contracts', fromJS({
        ctrMap: action.ctrMap,
        historyMap: action.historyMap,
        profiles: action.profiles,
        doctors: action.doctors,
        token: action.token
      }))
    case 'REQUEST_LOGIN':
      return state.set('loginRequested', true).set('email', action.email)
    case 'CHECK_LOGIN_STATUS':
      if (state.get('loginRequested') !== true ||
        action.verifiedEmails.indexOf(state.get('email')) === -1) {
        return state
      } else {
        const email = state.get('email', '')
        if (email === '' || action.accounts[email] === undefined) {
          return state
        }
        return state.delete('loginRequested').merge(fromJS({
          loggedIn: true,
          account: action.accounts[email].account,
          priKey: action.accounts[email].priKey
        }))
      }
    default:
      return state
  }
}
