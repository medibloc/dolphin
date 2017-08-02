export function setup(ctrMap, historyMap, profiles, doctors, mediBlocToken) {
  return {
    type: 'SETUP',
    ctrMap,
    historyMap,
    profiles,
    doctors,
    mediBlocToken
  }
}

export function requestLogin(email) {
  return {
    meta: {
      remote: true
    },
    type: 'REQUEST_LOGIN',
    email
  }
}

export function setAccount(email, account, priKey) {
  return {
    type: 'SET_ACCOUNT',
    email,
    account,
    priKey
  }
}

export function setProfile(profile, balance, isDoctor) {
  return {
    type: 'SET_PROFILE',
    profile,
    balance,
    isDoctor
  }
}

export function getProfile(email, account, priKey) {
  return {
    type: 'GET_PROFILE',
    email,
    account,
    priKey
  }
}
