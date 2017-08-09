import { fromJS } from 'immutable';

var initialState = fromJS({});

export default function mainReducer(state = initialState, action) {
  switch(action.type) {

    default:
      return state;
  }
}
