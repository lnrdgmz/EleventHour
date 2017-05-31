require('dotenv').config();
const nodemailer = require('nodemailer');
const Event = require('../models/event');
const Attendee = require('../models/attendee');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Takes an object of options: to, subject, and text.
 */
const sendEmailNotification = (options) => {
  const mailOptions = Object.assign(options, { from: process.env.EMAIL });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Sent an email:', info.messageId, info.response);
  });
};

const getEventTitle = (eventId) => {
  return new Event({ id: eventId }).fetch()
    .then((model) => {
      const eventTitle = model.get('title');
      return eventTitle;
    });
};

const getCreatorDetails = (eventId) => {
  return new Attendee({ event_id: eventId, flag: 'creator' }).fetch({ withRelated: 'users' })
    .then((model) => {
      return {
        email: model.related('users').get('email'),
        name: model.related('users').get('display_name'),
      };
    });
};

const getUserDetails = (user_id) => {
  return new User({ id: user_id }).fetch()
    .then((model) => {
      return {
        email: model.get('email'),
        name: model.get('display_name'),
      };
    });
};

const emailCreator = (eventId, userId) => {
  const data = [
    getCreatorDetails(eventId),
    getEventTitle(eventId),
    getUserDetails(userId),
  ];
  Promise.all(data)
    .then((arr) => {
      if (!arr[0].email) {
        Promise.reject(new Error('No email address for creator found'));
      }
      const emailOptions = {
        to: arr[0].email,
        subject: 'Someone has requested to join your event',
        text: `Hey ${arr[0].name},
      ${arr[2].name} has requested to attend your event ${arr[1]}.

      Visit the site to approve or decline this request.`,
      };
      sendEmailNotification(emailOptions);
    });
};

const emailApprovedUser = (userId, eventId) => {
  const data = [
    getCreatorDetails(eventId),
    getEventTitle(eventId),
    getUserDetails(userId),
  ];
  Promise.all(data)
    .then((arr) => {
      if (!arr[2].email) {
        Promise.reject(new Error('No email found for user.'));
      }
      const emailOptions = {
        to: arr[2].email,
        subject: 'You\'ve been accepted',
        text: `Hey ${arr[2].name},
      ${arr[0].name} has accepted your request to join ${arr[1]}.

      Stay tuned for more details.`,
      };
      sendEmailNotification(emailOptions);
    });
};

module.exports = {
  emailCreator,
  emailApprovedUser,
};
