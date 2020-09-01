const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case 'ADD_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default: 
      return state;
  }
};

export default loggedReducer;
