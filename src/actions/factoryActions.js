import {
  sendGetRequest,
  sendPostRequest,
} from '../utils/customRequests';

function setFactoryEmployees(json) {
  return {type: 'SET_FACTORY_EMPLOYEES', json}
}

function setFactoryInfo(factory, info) {
  return {type: 'SET_FACTORY_INFO', factory, info}
}

export function getFactoryInfo(factory) {
  return function thunk(dispatch) {
    sendGetRequest('/api/factories/'+factory, (json) => {
      dispatch(setFactoryInfo(factory, json.factory))
    }, null, false)
  }
}

export function getFactoryUsers(factory) {
  return function thunk(dispatch) {
    const url = '/api/factories/'+factory+'/employees'
    sendGetRequest(url, (json) => {
      dispatch(setFactoryEmployees(factory, json));
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

