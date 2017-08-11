import { fromJS } from 'immutable';

var initialState = fromJS({isAuthenticating: true});

export default function mainReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_AUTHENTICATING_COMPLETE':
      return state.set('isAuthenticating', false);
    case 'SET_USER':
      return state.set('user', fromJS(action.user));

    default:
      return state;
  }
}
