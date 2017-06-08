// Utility Functions for frontend.
import $ from 'jquery';
import moment from 'moment';

export const getInitialEvents = () => fetch('/events?page=1').then(events => events);

export function sendToUser(message) {
  console.log(message.recipient_id, typeof message);
  $.post(`/messages/${message.recipient_id}`, { message }, (data) => {
    console.log(data);
  });
}

export function getUserMessages(user) {
  console.log(user);
  fetch(`/messages/${user.id}`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => data);
}

export function getWeather(event) {
  const geoLoc = `${event.lat},${event.lng}`;
  const time = moment(event.date_time).format('X');

  return fetch( `/api/weather?info=${time}&loc=${geoLoc}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  .then(resp => resp.json())
  .then((data) => {
    const arr = [];
    arr.push(data.hourly.summary);
    arr.push(data.hourly.data[0].temperature);
    console.log(arr);
    return arr;
  });
}
