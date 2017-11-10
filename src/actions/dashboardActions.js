import { sendGetRequest } from '../utils/customRequests';

export function setGlobalDashboardData(json) {
  return {type: 'SET_GLOBAL_DASHBOARD_DATA', json}
}

export function setFactories(factories) {
  return {type: 'SET_ADMIN_FACTORIES', factories}
}

export function getGlobalDashboardData() {
  return function thunk(dispatch) {
    sendGetRequest('/api/dashboards/global', (json) => {
      dispatch(setGlobalDashboardData(json))
    })
  }
}

export function getFactories() {
  return function thunk(dispatch) {
    sendGetRequest('/api/factories', (json) => {
      dispatch(setFactories(json.factories))
    }, null, true)
  }
}
