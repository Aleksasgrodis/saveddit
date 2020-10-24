import * as Types from '../actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_NEW:
      return state;
    default:
      return state;
  }
}