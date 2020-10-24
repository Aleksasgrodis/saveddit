import * as Types from '../actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      return [...state, ...action.links];
    default:
      return state;
  }
}