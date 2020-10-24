import * as Types from '../actionTypes';

const initialState = {
  saved: [],
  fetching: true,
  hasErrored: false,
  after: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      return { ...state, saved: [...state.saved, ...action.saved] };
    default:
      return state;
  }
}
