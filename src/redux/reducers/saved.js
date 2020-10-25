import * as Types from '../actionTypes';

const initialState = {
  links: [],
  isLoading: true,
  hasErrored: false,
  after: '',
  fetchCount: 0,
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      console.log(action);
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
      };
    case 'ADD_BATCH': 
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
        after: action.after,
        fetchCount: action.count,
      }
    case 'SET_LOADING_STATUS':
      return {
        ...state,
        isLoading: action.status,
      };
    case 'SET_AFTER':
      return {
        ...state,
        after: action.after,
      };
    case 'SET_FETCH_COUNT':
      return {
        ...state,
        fetchCount: action.count,
      };
    default:
      return state;
  }
}
