import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import rootReducer from './reducers';

import throttle from 'lodash.throttle';

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(
  throttle(() => {
    saveState({
      saved: store.getState().saved,
      user: store.getState().user,
    });
  }, 1000),
);

export default store;
