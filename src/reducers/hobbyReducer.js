import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function catReducer(state = initialState.hobbies, action) {
  switch (action.type) {
    case types.LOAD_HOBBIES_SUCCESS:
      return action.hobbies
    default:
      return state;
  }
}
