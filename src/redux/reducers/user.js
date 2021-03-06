import * as Types from '../actionTypes'

const initialState = {
  account_created: null,
  avatar: null,
  coins: null,
  karma: null,
  name: null,
  refresh_token: null,
  token: null,
  verified: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.SET_TOKENS:
      return {
        ...state,
        token: action.token,
        refresh_token: action.refresh_token,
        expires: action.expires,
      }
    case Types.SET_USER_DETAILS:
      return {
        ...state,
        name: action.name,
        avatar: action.avatar,
        account_created: action.account_created,
        karma: action.karma,
        verified: action.verified,
        coins: action.coins,
      }

    case Types.UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
        expires: action.expires,
      }

    case Types.CLEAR_STATE:
      return {}
    default:
      return state
  }
}
