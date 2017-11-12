import { sendGetRequest } from '../utils/customRequests';
import { updatePoly } from  '../utils/i18n';

export function setUser(user) {
  return {type: 'SET_USER', user}
}

export function setAuthenticatingComplete() {
  return {type: 'SET_AUTHENTICATING_COMPLETE'}
}

export function isUserLoggedIn() {
  return function thunk(dispatch) {
    var user, req = 0;
    var loaded = () => {
      if(req < 1) return req++;
      dispatch(setUser(user));
      dispatch(setAuthenticatingComplete());
    }

    updatePoly(() => loaded())

    sendGetRequest('/api/users', (json) => {
      user = json.user
      loaded()
    }, null, true);
  }
}

export function logout(doneCallback) {
  return function thunk(dispatch) {
    sendGetRequest('/api/users/logout', (json) => {
      dispatch(setUser({}))
      doneCallback()
    })
  }
}
