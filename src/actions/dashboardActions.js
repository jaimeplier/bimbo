import { sendGetRequest } from '../utils/customRequests';

export function setGlobalDashboardData(json) {
  return {type: 'SET_GLOBAL_DASHBOARD_DATA', json}
}

export function getGlobalDashboardData() {
  return function thunk(dispatch) {
    sendGetRequest('/api/dashboards/global', (json) => {
      dispatch(setGlobalDashboardData(json))
    })
  }
}
