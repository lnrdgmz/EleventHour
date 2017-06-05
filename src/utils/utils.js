// Utility Functions for frontend.
import $ from 'jquery';

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
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}
