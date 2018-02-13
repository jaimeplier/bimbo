import { sendGetRequest } from '../utils/customRequests';

export function setCompareData(json) {
  return { type: 'SET_COMPARE_DATA', json };
}

export function getCompareData(factory1slug, factory2slug) {
  return function thunk(dispatch) {
    const url = `/api/compare?factory1=${factory1slug}&factory2=${factory2slug}`;
    sendGetRequest(url, (json) => {
      dispatch(setCompareData(json));
    });
  };
}
