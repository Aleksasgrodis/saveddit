export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('saved');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log('localStorage.js error: ', error);
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('saved', serializedState);
  } catch (error) {
    console.log('localStorage.js error: ', error);
    return undefined;
  }
};
