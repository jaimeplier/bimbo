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

function setFactorySummary(factory, json) {
  return {type: 'SET_FACTORY_SUMMARY', factory, json}
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

export function createFactoryUser(factory, name, callback) {
  return function thunk(dispatch) {
    const url = '/api/factories/'+ factory +'/employees'
    sendPostRequest(url,
      {name, language: 'es'},
      (u) => {callback(u); dispatch(getFactoryUsers(factory))}
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

export function getFactorySummary(factory) {
  return function thunk(dispatch) {
    const url = '/api/factories/'+ factory +'/summary'
    sendGetRequest(url, (json) => {
      dispatch(setFactorySummary(factory, json))
    })
  }
}

