export const addToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
})

export const addUsername = (username) => ({
  type: 'ADD_USERNAME',
  username,
})

export const addCode = (code) => ({
  type: 'ADD_CODE',
  code,
})

export const addSaved = (data) => ({
  type: 'ADD_SAVED',
  data,
})

export const getSaved = () => ({
  type: 'GET_SAVED',
})
