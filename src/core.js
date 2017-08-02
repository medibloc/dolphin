import {setProfile} from './action_creators'
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
