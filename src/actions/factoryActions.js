import { sendGetRequest } from '../utils/customRequests';

function setFactoryEmployees(json) {
  return {type: 'SET_FACTORY_EMPLOYEES', json}
}

export function getFactoryUsers() {
  return function thunk(dispatch) {
    sendGetRequest('/api/users/employee', (json) => {
      dispatch(setFactoryEmployees(json));
    })
  }
}
