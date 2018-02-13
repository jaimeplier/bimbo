import { sendGetRequest } from '../utils/customRequests';
import { updatePoly } from '../utils/i18n';

export function setUser(user) {
  return { type: 'SET_USER', user };
}

export function setAuthenticatingComplete() {
  return { type: 'SET_AUTHENTICATING_COMPLETE' };
}

export function toggleFactorySideNav() {
  return { type: 'TOGGLE_SIDENAV_FACTORIES' };
}

export function isUserLoggedIn() {
  return function thunk(dispatch) {
    let user;
    let req = 0;
    const loaded = () => {
      req += 1;
      // wait for both requests to finish (user and language)
      if (req < 2) return req;
      dispatch(setUser(user));
      dispatch(setAuthenticatingComplete());
    };

    updatePoly(() => loaded());

    sendGetRequest('/api/users', (json) => {
      const { user: userJson } = json;
      user = userJson;
      loaded();
    }, null, true);
  };
}

export function logout(doneCallback) {
  return function thunk(dispatch) {
    sendGetRequest('/api/users/logout', () => {
      dispatch(setUser({}));
      doneCallback();
    });
  };
}
