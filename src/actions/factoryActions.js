import {
  sendGetRequest,
  sendPostRequest,
} from '../utils/customRequests';

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

export function createFactoryUser(name, callback) {
  return function thunk(dispatch) {
    sendPostRequest(
      '/api/users/employee/create',
      {name, factoryId: 1, language: 'es'},
      (u) => {callback(u); dispatch(getFactoryUsers())}
    )
  }
}
