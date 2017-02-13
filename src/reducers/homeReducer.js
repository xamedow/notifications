import u from 'updeep';
import R from 'ramda';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      return u(R.append(action.payload, state), state);

    case 'READ_EVENTS':
      return u.map(event => (u({unread: false}, event)), state);

    case 'CLEAR_EVENTS':
      return [];

    default:
      return state;
  }
};
