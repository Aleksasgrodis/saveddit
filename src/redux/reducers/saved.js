import * as Types from '../actionTypes';

const initialState = {
  links: [],
  fetching: true,
  hasErrored: false,
  after: '',
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      console.log(action)
      return { ...state, links: [...state.links, ...action.links], total: state.links.length + action.links.length };
    case 'HAS_FINISHED':
      return {
        ...state,
        fetching: false,
      }
    default:
      return state;
  }
}
