import {setProfile, setHistories, setSearchResults} from './action_creators'
import {store} from './index'

export function getProfile(state, email, account, priKey) {
  fetch('http://localhost:3000/show', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        account: account,
        priKey: priKey
      })
    })
    .then((r) => r.json())
    .then((o) => {
      console.log('Profile data got: ' + JSON.stringify(o))
      store.dispatch(setProfile(o.profile, o.balance, o.isDoctor))
    })
    .catch((err) => {
      console.error(err)
    })

  return state
}

export function getHistories(state, email, account, priKey) {
  fetch('http://localhost:3000/histories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        account: account,
        priKey: priKey
      })
    })
    .then((r) => r.json())
    .then((o) => {
      store.dispatch(setHistories(o))
    })
    .catch((err) => {
      console.error(err)
    })

  return state
}

export function searchHistories(state, query) {
  var queryString = '?'
  Object.keys(query).forEach((key) => {
    if (query[key].length > 0) {
      queryString += key + '=' + query[key] + '&'
    }
  })
  console.log('Query: ' + queryString)
  fetch('http://localhost:3333/histories' + queryString, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((r) => r.json())
    .then((o) => store.dispatch(setSearchResults(o)))
    .catch((e) => {
      console.log(e)
    })

  return state
}
