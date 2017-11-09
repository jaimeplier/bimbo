import { fromJS } from 'immutable';

var initialState = fromJS({isAuthenticating: true, factories:{}});

export default function mainReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_AUTHENTICATING_COMPLETE':
      return state.set('isAuthenticating', false);
    case 'SET_USER':
      return state.set('user', fromJS(action.user));

    case 'SET_GLOBAL_DASHBOARD_DATA':
      return state.set('globalDashboard', fromJS(action.json));
    case 'SET_ADMIN_FACTORIES':
      return state.set('adminFactories', fromJS(action.factories));

    case 'SET_FACTORY_EMPLOYEES':
      return state.set('employees', fromJS(action.json.users));

    default:
      return state;
  }
}
