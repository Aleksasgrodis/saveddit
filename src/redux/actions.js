import * as Types from './actionTypes';

export const addLinks = ({ links }) => ({
  type: Types.ADD_LINKS,
  links,
});

export const hasFinished = ({ status }) => ({
  type: 'HAS_FINISHED',
  status,
});
