const userReducer = (
  state = { code: null, username: null, token: null },
  action,
) => {
  switch (action.type) {
    case 'ADD_CODE':
      return { ...state, code: action.code };
    case 'GET_CODE':
      return state.code;
    case 'ADD_TOKEN':
      return { ...state, token: action.token };
    case 'GET_TOKEN':
      return state.token;
    case 'ADD_USERNAME':
      return { ...state, username: action.code };
    case 'GET_USERNAME':
      return state.username;
    default:
      return state;
  }
};

export default userReducer;
