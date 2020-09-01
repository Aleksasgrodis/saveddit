export const addToken = token => {
  return {
    type: 'ADD_TOKEN',
    token
  }
}

export const addUsername = username => {
  return {
    type: 'ADD_USERNAME',
    username
  }
}

export const addCode = code => {
  return {
    type: 'ADD_CODE',
    code
  }
}