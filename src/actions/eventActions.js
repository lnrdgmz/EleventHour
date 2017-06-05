import fetch from 'isomorphic-fetch';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const FILTER_EVENTS_BY_TITLE = 'FILTER_EVENTS_BY_TITLE';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const requestEvents = (eventObject) => {
  return {
    type: REQUEST_EVENTS,
    eventObject,
  };
};


export const receiveEvents = (json) => {
  return {
    type: RECEIVE_EVENTS,
    payload: json,
  };
};

/* Async Action Creators*/

export function fetchEvents(zipCode, page) {
  return function (dispatch) {
    fetch(`/events?page=${page}&zipCode=${zipCode}` || '/events')
    .then(response => response.json())
    .then(parsedData => dispatch({ type: RECEIVE_EVENTS, payload: parsedData }));
  };
}
