import { fromJS } from 'immutable';

const initialState = fromJS({
  isAuthenticating: true, factories: {}, sidenavFactoriesOpen: false,
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTHENTICATING_COMPLETE':
      return state.set('isAuthenticating', false);
    case 'SET_USER':
      return state.set('user', fromJS(action.user));
    case 'TOGGLE_SIDENAV_FACTORIES':
      return state.update('sidenavFactoriesOpen', r => !r);

    // DasbhoardActions
    case 'SET_GLOBAL_DASHBOARD_DATA':
      return state.set('globalDashboard', fromJS(action.json));
    case 'SET_ADMIN_FACTORIES':
      return state.set('adminFactories', fromJS(action.factories));
    case 'SET_PRODUCTS_BY_ORGANIZATION':
      return state.set('currentProducts', fromJS(action.orgProducts));
    case 'SET_ORGANIZATIONS':
      return state.set('organizations', fromJS(action.organizations));

    case 'SET_FACTORY_EMPLOYEES':
      return state.setIn([
        'factories', action.factory, 'employees',
      ], fromJS(action.employees));
    case 'SET_FACTORY_MANAGERS':
      return state.setIn([
        'factories', action.factory, 'managers',
      ], fromJS(action.managers));
    case 'SET_FACTORY_INFO':
      return state.setIn([
        'factories', action.factory, 'info',
      ], fromJS(action.info));
    case 'SET_FACTORY_ACTION_PLANS':
      return state.setIn([
        'factories', action.factory, 'actionPlans',
      ], fromJS(action.actionPlans));
    case 'SET_FACTORY_SUMMARY':
      return state.setIn([
        'factories', action.factory, 'summary',
      ], fromJS(action.json));
    case 'SET_FACTORY_SCORES':
      return state.setIn([
        'factories', action.factory, 'scores',
      ], fromJS(action.scores));

    case 'SET_COMPARE_DATA':
      return state.set('compareData', fromJS(action.json));

    default:
      return state;
  }
}
