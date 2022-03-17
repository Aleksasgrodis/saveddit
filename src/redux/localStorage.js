export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('data')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

// eslint-disable-next-line consistent-return
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('data', serializedState)
  } catch (error) {
    return undefined
  }
}
