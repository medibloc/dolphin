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

export function logout() {
  return {
    type: 'LOGOUT'
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

export function setHistories(histories) {
  return {
    type: 'SET_HISTORIES',
    histories
  }
}

export function getHistories(email, account, priKey) {
  return {
    type: 'GET_HISTORIES',
    email,
    account,
    priKey
  }
}

export function searchHistories(query) {
  return {
    type: 'SEARCH_HISTORIES',
    query
  }
}

export function setSearchResults(results) {
  return {
    type: 'SET_SEARCH_RESULTS',
    results
  }
}
