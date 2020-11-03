import * as Types from './actionTypes';

export const addLinks = ({ links }) => ({
  type: Types.ADD_LINKS,
  links,
});

export const addBatch = ({ links, after, count }) => ({
  type: 'ADD_BATCH',
  links,
  after,
  count,
});

export const setLoadingStatus = ({ status }) => ({
  type: 'SET_LOADING_STATUS',
  status,
});

export const setAfter = ({ after }) => ({
  type: 'SET_AFTER',
  after,
});

export const setFetchCount = ({ count }) => ({
  type: 'SET_FETCH_COUNT',
  count,
});


// load_numbered_page - for initial load (1) and any (n) page thereafter.
export const loadNumberedPage = ({page}) => ({
  type: 'LOAD_NUMBERED_PAGE',
  page
})

export const refreshSaved = () => ({
  type: 'REFRESH'
})
// load_next_page
// load_prev_page

// set_filter_values

