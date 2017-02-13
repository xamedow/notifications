export const addEvent = payload => ({
  type: 'ADD_EVENT',
  payload
});

export const markAllAsRead = () => ({
  type: 'READ_EVENTS'
});

export const clearEvents = () => ({
  type: 'CLEAR_EVENTS'
});
