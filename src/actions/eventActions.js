import fetch from 'isomorphic-fetch';

export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const FILTER_EVENTS_BY_TITLE = "FILTER_EVENTS_BY_TITLE";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";

export const requestEvents = (eventObject) => {
  return {
    type: REQUEST_EVENTS,
    eventObject
  }
}


export const recieveEvents = (json) =>{
  console.log('Im in recieveEvents and the json is:')
  console.log(json)

  return {
    type: RECEIVE_EVENTS,
    payload: json
  }
}

// export const boundReceiveEvents = () =>{}

/* Async Action Creators*/

export function fetchEvents(){
  return function(dispatch){
    console.log('arguments is', arguments)
 
    return fetch('/events?page=5')
    .then((response) => { return response.json()  } )
    .then((parsedData)=> {
      console.log(parsedData);
      dispatch({type: RECEIVE_EVENTS, payload: parsedData})

      }
    )
  }
}
