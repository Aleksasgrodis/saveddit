import * as Types from '../actionTypes';

const initialState = {
  links: [],
  isLoading: true,
  hasErrored: false,
  after: '',
  fetchCount: 100,
  total: 0,
  subredditFilter: null,
  totalPages: 0,
  searchResults: [],
  searchPages: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
      };
    case Types.ADD_BATCH:
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
        totalPages: Math.ceil((state.links.length + action.links.length) / 20),
        after: action.after,
        fetchCount: action.count,
        currentPage: 1,
        filterValues: [],
        pageResults: [],
        sortResults: [],
        searchResults: [...state.links, ...action.links],
        searchPages: Math.ceil((state.links.length + action.links.length) / 20),
      };
    case Types.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status,
      };
    case Types.SET_AFTER:
      return {
        ...state,
        after: action.after,
      };
    case Types.SET_FETCH_COUNT:
      return {
        ...state,
        fetchCount: action.count,
      };
    case Types.LOAD_NUMBERED_PAGE:
      let lowerCount = (action.page - 1) * 20;
      let upperCount = lowerCount + 20;
      let pageResults = state.searchResults.slice(lowerCount, upperCount);
      return {
        ...state,
        pageResults: pageResults,
        currentPage: action.page,
      };
    case Types.REFRESH:
      return { ...initialState };
    case Types.SET_SUBREDDIT_FILTER:
      return {
        ...state,
        subredditFilter: action.subreddit,
      };
    case Types.SET_SORTING_METHOD:
      switch (action.method) {
        case 'a-z': {
          let sorted = state.searchResults.sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          };
        }
        case 'z-a': {
          let sorted = state.searchResults.sort((a, b) =>
            b.title.localeCompare(a.title),
          );
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          };
        }
        case 'dateNew': {
          let sorted = state.searchResults.sort((a, b) =>
            a.created_utc > b.created_utc ? -1 : 1,
          );
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          };
        }
        case 'dateOld': {
          let sorted = state.searchResults.sort((a, b) =>
            a.created_utc > b.created_utc ? 1 : -1,
          );
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          };
        }
        case 'popularity': {
          let sorted = state.searchResults.sort((a, b) =>
            a.score > b.score ? -1 : 1,
          );
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          };
        }
        case 'lastSaved': {
          let searchResults = [...state.links];
          if (state.subredditFilter) {
            searchResults = searchResults.filter(
              post => post.subreddit === state.subredditFilter,
            );
          }
          return {
            ...state,
            searchResults,
            pageResults: searchResults.slice(0, 20),
            searchPages: Math.ceil(searchResults.length / 20),
          };
        }
        default:
          break;
      }
      break;
    case Types.SET_SEARCH_RESULTS:
      let copy = [...state.links];
      if (state.subredditFilter) {
        copy = copy.filter(post => post.subreddit === state.subredditFilter);
      }
      let searchResults = copy.filter(link =>
        link.title.toLowerCase().includes(action.value.toLowerCase()),
      );
      return {
        ...state,
        searchResults,
        pageResults: searchResults.slice(0, 20),
        searchPages: Math.ceil(searchResults.length / 20),
      };
    case Types.UNSAVE_POST:
      return {
        ...state,
        links: state.links.filter(link => link.id !== action.id),
        searchResults: state.searchResults.filter(
          link => link.id !== action.id,
        ),
        pageResults: state.pageResults.filter(link => link.id !== action.id),
      };
    default:
      return state;
  }
}
