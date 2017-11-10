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
      return state.setIn([
        'factories', action.factory, 'employees'
      ], fromJS(action.employees))
    case 'SET_FACTORY_INFO':
      return state.setIn([
        'factories', action.factory, 'info'
      ], fromJS(action.info))
    case 'SET_FACTORY_ACTION_PLANS':
      return state.setIn([
        'factories', action.factory, 'actionPlans'
      ], fromJS(action.actionPlans))

    default:
      return state;
  }
}
