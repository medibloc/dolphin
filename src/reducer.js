import {fromJS} from 'immutable'
import {setupContracts} from './contracts'
import {getProfile} from './core'

export const INITIAL_STATE = fromJS({loggedIn: false, contracts: {}, web3: {}, profile: {}})

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SETUP':
      return setupContracts(state, {
        ctrMap: action.ctrMap,
        historyMap: action.historyMap,
        profiles: action.profiles,
        doctors: action.doctors,
        mediBlocToken: action.mediBlocToken
      })
    case 'REQUEST_LOGIN':
      return state.set('loginRequested', true).set('email', action.email)
    case 'SET_ACCOUNT':
      return state.delete('loginRequested').merge(fromJS({
        loggedIn: true,
        email: action.email,
        account: action.account,
        priKey: action.priKey
      }))
    case 'SET_PROFILE':
      return state.merge(fromJS({
        profile: action.profile,
        balance: action.balance,
        isDoctor: action.isDoctor
      }))
    case 'GET_PROFILE':
      return getProfile(state, action.email, action.account, action.priKey)
    default:
      return state
  }
}
