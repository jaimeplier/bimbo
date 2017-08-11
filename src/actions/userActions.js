import { sendGetRequest } from '../utils/customRequests';

export function setUser(user) {
  return {type: 'SET_USER', user}
}

export function setAuthenticatingComplete() {
  return {type: 'SET_AUTHENTICATING_COMPLETE'}
}

export function isUserLoggedIn() {
  return function thunk(dispatch) {
   sendGetRequest('/api/users', (json) => {
     dispatch(setUser(json.user));
     dispatch(setAuthenticatingComplete());
   }, () => null, true);
  }
}
