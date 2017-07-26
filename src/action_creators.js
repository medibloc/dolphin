export function setup(ctrMap, historyMap, profiles, doctors, token) {
  return {
    type: 'SETUP',
    ctrMap,
    historyMap,
    profiles,
    doctors,
    token
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

export function checkLoginStatus(state) {
  return {
    type: 'CHECK_LOGIN_STATUS',
    verifiedEmails: state.loginVerified,
    accounts: state.accounts
  }
}