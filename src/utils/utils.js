// Utility Functions for frontend.


 export const getInitialEvents = () => fetch('/events?page=1').then(events => events);
