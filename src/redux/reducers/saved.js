import * as Types from '../actionTypes';

const initialState = {
  links: [],
  isLoading: true,
  hasErrored: false,
  after: '',
  fetchCount: 100,
  total: 0,
  pages: 0,
  searchResult: [],
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
        pages: Math.ceil((state.links.length + action.links.length) / 20),
        after: action.after,
        fetchCount: action.count,
        currentPage: 1,
        filterValues: [],
        pageResults: [],
        filterResults: [],
        sortResults: [],
      };
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
    case 'LOAD_NUMBERED_PAGE':
      let lowerCount = (action.page - 1) * 20;
      let upperCount = lowerCount + 20;
      let pageResults = state.links.slice(lowerCount, upperCount);
      return {
        ...state,
        pageResults: pageResults,
        currentPage: action.page,
      };
    case 'REFRESH':
      return { ...initialState };
    case 'SET_SEARCH_VALUE': 
      let copy = [...state.links];
      let searchResult = copy.filter(link => link.title.toLowerCase().includes(action.value.toLowerCase()))
      return {
        ...state,
        searchResult
      }
    default:
      return state;
  }
}
