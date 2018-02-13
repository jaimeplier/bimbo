import { sendGetRequest } from '../utils/customRequests';

export function setGlobalDashboardData(json) {
  return { type: 'SET_GLOBAL_DASHBOARD_DATA', json };
}


export function setFactories(factories) {
  return { type: 'SET_ADMIN_FACTORIES', factories };
}

export function setProductsByOrganization(orgProducts) {
  return { type: 'SET_PRODUCTS_BY_ORGANIZATION', orgProducts };
}

export function setOrganizations(organizations) {
  return { type: 'SET_ORGANIZATIONS', organizations };
}

export function getGlobalDashboardData() {
  return function thunk(dispatch) {
    sendGetRequest('/api/dashboards/global', (json) => {
      dispatch(setGlobalDashboardData(json));
    });
  };
}

export function getFactories() {
  return function thunk(dispatch) {
    sendGetRequest('/api/factories', (json) => {
      dispatch(setFactories(json.factories));
    }, null, true);
  };
}

export function getProductsByOrganization(organization) {
  return function thunk(dispatch) {
    sendGetRequest(`/api/organizations/${organization}/products`, (json) => {
      dispatch(setProductsByOrganization(json.products));
    });
  };
}

export function getOrganizations() {
  return function thunk(dispatch) {
    sendGetRequest('/api/organizations', (json) => {
      dispatch(setOrganizations(json.organizations));
    });
  };
}
