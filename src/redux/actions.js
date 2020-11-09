import * as Types from './actionTypes';

export const addLinks = ({ links }) => ({
  type: Types.ADD_LINKS,
  links,
});

export const addBatch = ({ links, after, count }) => ({
  type: Types.ADD_BATCH,
  links,
  after,
  count,
});

export const setLoadingStatus = ({ status }) => ({
  type: Types.SET_LOADING_STATUS,
  status,
});

export const setAfter = ({ after }) => ({
  type: Types.SET_AFTER,
  after,
});

export const setFetchCount = ({ count }) => ({
  type: Types.SET_FETCH_COUNT,
  count,
});

// load_numbered_page - for initial load (1) and any (n) page thereafter.
export const loadNumberedPage = ({ page }) => ({
  type: Types.LOAD_NUMBERED_PAGE,
  page,
});

export const refreshSaved = () => ({
  type: Types.REFRESH,
});

export const setSearchResults = ({ value }) => ({
  type: Types.SET_SEARCH_RESULTS,
  value,
});

export const setSubredditFilter = ({ subreddit }) => ({
  type: Types.SET_SUBREDDIT_FILTER,
  subreddit,
});

export const setSortingMethod = ({ method }) => ({
  type: Types.SET_SORTING_METHOD,
  method,
});

export const unsavePost = ({ id }) => ({
  type: Types.UNSAVE_POST,
  id,
});

export const resetPageNumber = () => ({
  type: Types.RESET_PAGE_NUMBER,
});

export const clearState = () => ({
  type: Types.CLEAR_STATE,
});
