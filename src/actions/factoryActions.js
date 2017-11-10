import {
  sendGetRequest,
  sendPostRequest,
} from '../utils/customRequests';

function setFactoryInfo(factory, info) {
  return {type: 'SET_FACTORY_INFO', factory, info}
}

function setFactoryEmployees(factory, employees) {
  return {type: 'SET_FACTORY_EMPLOYEES', factory, employees}
}

function setFactoryActionPlans(factory, actionPlans) {
  return {
    type: 'SET_FACTORY_ACTION_PLANS',
    factory,
    actionPlans
  }
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
      dispatch(setFactoryEmployees(factory, json.employees));
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

export function getFactoryActionPlans(factory) {
  return function thunk(dispatch) {
    const url = '/api/factories/'+ factory +'/action-plans'
    sendGetRequest(url, (json) => {
      dispatch(setFactoryActionPlans(factory, json.actionPlans))
    })
  }
}

