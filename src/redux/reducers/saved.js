import * as Types from '../actionTypes'

const initialState = {
  links: [],
  isLoading: true,
  hasErrored: false,
  afterListing: '',
  fetchCount: 100,
  total: 0,
  subredditFilter: null,
  nsfwFilter: false,
  totalPages: 0,
  searchResults: [],
  searchPages: 0,
  searchTotal: 0,
}

export default function saved(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_LINKS:
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
      }
    case Types.ADD_BATCH:
      return {
        ...state,
        links: [...state.links, ...action.links],
        total: state.links.length + action.links.length,
        totalPages: Math.ceil((state.links.length + action.links.length) / 20),
        afterListing: action.afterListing,
        fetchCount: action.count,
        currentPage: 1,
        filterValues: [],
        pageResults: [],
        sortResults: [],
        searchResults: [...state.links, ...action.links],
        searchPages: Math.ceil((state.links.length + action.links.length) / 20),
      }
    case Types.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status,
      }
    case Types.SET_AFTER:
      return {
        ...state,
        afterListing: action.afterListing,
      }
    case Types.SET_FETCH_COUNT:
      return {
        ...state,
        fetchCount: action.count,
      }
    case Types.LOAD_NUMBERED_PAGE: {
      const lowerCount = (action.page - 1) * 20
      const upperCount = lowerCount + 20
      const pageResults = state.searchResults.slice(lowerCount, upperCount)
      return {
        ...state,
        pageResults,
        currentPage: action.page,
      }
    }
    case Types.REFRESH:
      return { ...initialState }
    case Types.SET_SUBREDDIT_FILTER:
      return {
        ...state,
        subredditFilter: action.subreddit,
      }
    case Types.SET_NSFW_FILTER:
      return {
        ...state,
        nsfwFilter: true,
      }
    case Types.RESET_NSFW_FILTER:
      return {
        ...state,
        nsfwFilter: false,
      }
    case Types.SET_SORTING_METHOD:
      switch (action.method) {
        case 'a-z': {
          const sorted = state.searchResults.sort((a, b) =>
            a.title.localeCompare(b.title),
          )
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          }
        }
        case 'z-a': {
          const sorted = state.searchResults.sort((a, b) =>
            b.title.localeCompare(a.title),
          )
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          }
        }
        case 'dateNew': {
          const sorted = state.searchResults.sort((a, b) =>
            a.created_utc > b.created_utc ? -1 : 1,
          )
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          }
        }
        case 'dateOld': {
          const sorted = state.searchResults.sort((a, b) =>
            a.created_utc > b.created_utc ? 1 : -1,
          )
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          }
        }
        case 'popularity': {
          const sorted = state.searchResults.sort((a, b) =>
            a.score > b.score ? -1 : 1,
          )
          return {
            ...state,
            searchResults: sorted,
            pageResults: sorted.slice(0, 20),
          }
        }
        case 'lastSaved': {
          let searchResults = [...state.links]
          if (state.subredditFilter) {
            searchResults = searchResults.filter(
              (post) => post.subreddit === state.subredditFilter,
            )
          }
          return {
            ...state,
            searchResults,
            pageResults: searchResults.slice(0, 20),
            searchPages: Math.ceil(searchResults.length / 20),
          }
        }
        default:
          break
      }
      break
    case Types.SET_SEARCH_RESULTS: {
      let copy = [...state.links]
      if (state.subredditFilter) {
        copy = copy.filter((post) => post.subreddit === state.subredditFilter)
      } else if (state.nsfwFilter === true) {
        copy = copy.filter((post) => post.over_18 === true)
      }
      const searchResults = copy.filter((link) =>
        link.title.toLowerCase().includes(action.value.toLowerCase()),
      )
      return {
        ...state,
        searchResults,
        pageResults: searchResults.slice(0, 20),
        searchPages: Math.ceil(searchResults.length / 20),
        searchTotal: searchResults.length,
        currentPage: 1,
      }
    }
    case Types.UNSAVE_POST:
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.id),
        searchResults: state.searchResults.filter(
          (link) => link.id !== action.id,
        ),
        pageResults: state.pageResults.filter((link) => link.id !== action.id),
      }
    case Types.RESET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: 1,
      }
    case Types.CLEAR_STATE:
      return {}
    default:
      return state
  }
}
