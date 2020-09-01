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

export const addSaved = data => {
  return {
    type: 'ADD_SAVED',
    data
  }
}

export const getSaved = () => {
  return {
    type: 'GET_SAVED',
  }
}