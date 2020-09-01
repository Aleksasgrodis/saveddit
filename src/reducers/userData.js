const userDataReducer = (state = false, action) => {
  // saved links
  // remove etc etc
  switch (action.type) {
    case 'ADD_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default: 
      return state;
  }
};

export default userDataReducer;
