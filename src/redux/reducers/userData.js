const userDataReducer = (state = [], action) => {
  // saved links
  // remove etc etc
  switch (action.type) {
    case 'ADD_SAVED':
      return [...state, ...action.data]
    case 'GET_SAVED':
      return state;
    default: 
      return state;
  }
};

export default userDataReducer;
