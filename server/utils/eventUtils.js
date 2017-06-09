const GeoPoint = require('geopoint');
const sample = require('lodash').sample;
const Event = require('../models/event');

// Put all utility/helper functions for events here

/**
 * This function should grab an event and attendee data, comparing the
 * size of the event with the number of approved attendees, and update
 * the event accordingly. It mostly works, but reliably does not work
 * with event 79. User 165 doesn't show up as an attendee, though it
 * does on Workbench.
 *
 */

const updateEventFull = (eventId) => {
  new Event({ id: eventId }).fetch({ withRelated: 'users' })
    .then((model) => {
      const numSlots = model.get('needs');
      const related = model.related('users');
      // console.log('attendee id numbers:');
      // related.forEach((relatedModel) => {
      //   console.log(relatedModel.get('id'), relatedModel.pivot.get('flag'));
      // });
      const numApproved = related.filter(m => m.pivot.get('flag') === 'approved').length;
      // console.log('Number of approved people:')
      // console.log(numApproved);
      if (numApproved === numSlots) {
        // update model to be full
        model.save({ full: 1 }, { patch: true });
      } else if (numApproved < numSlots && model.get('full') === 1) {
        // ensure `full` is correct
        model.save({ full: 0 }, { patch: true });
      } else {
        // TODO Handle the case where too many people have been approved?
      }
    });
};

const boundingBox = (lat, lng, dist) => {
  const point = new GeoPoint(lat, lng);
  const bounds = point.boundingCoordinates(dist);
  return {
    lowerLat: Math.min(bounds[0].latitude(), bounds[1].latitude()),
    upperLat: Math.max(bounds[0].latitude(), bounds[1].latitude()),
    lowerLng: Math.min(bounds[0].longitude(), bounds[1].longitude()),
    upperLng: Math.max(bounds[0].longitude(), bounds[1].longitude()),
  };
};


const defaultImageUrls = [
  [],
  // juggling
  [
    'https://media.giphy.com/media/FNKr7naceO3tu/giphy.gif',
    'https://media.giphy.com/media/3o7ZeKMDJrK9UvhUmA/giphy.gif',
    'https://media.giphy.com/media/3eE7PuC4qxxVm/giphy.gif',
  ],
  // golf
  [
    'https://media.giphy.com/media/qAREK41X3nzl6/giphy.gif',
    'https://c1.staticflickr.com/6/5065/5611185774_5b3442722f_z.jpg',
    'https://c1.staticflickr.com/6/5306/5897249227_eaba35ba42_z.jpg',
  ],
  // frisbee
  [
    'https://media.giphy.com/media/Ok4HaWlYrewuY/giphy.gif',
    'https://c1.staticflickr.com/6/5481/31284729546_e78b61c988_z.jpg',
    'https://c2.staticflickr.com/4/3382/3194406377_4b5ab70ed0_z.jpg?zz&#x3D;1',
  ],
  // finger painting
  [
    'https://media.giphy.com/media/l0Hlushb1PQ3eBBLO/giphy.gif',
    'https://c1.staticflickr.com/4/3832/11056056816_1c742735f7_z.jpg',
  ],
  // basketball
  [
    'https://media.giphy.com/media/Z54VPIMUNTnyg/giphy.gif',
    'https://c1.staticflickr.com/7/6010/5931986666_7402a781db.jpg',
    'https://c1.staticflickr.com/9/8004/7557858454_c50b557307_z.jpg',
  ],
  // football
  [
    'https://c1.staticflickr.com/6/5575/14733358271_8013b61096.jpg',
  ],
  // soccer
  [
    'https://media.giphy.com/media/dKdtyye7l5f44/giphy.gif',
    'https://c1.staticflickr.com/3/2894/10844225404_aff57acc59_z.jpg',
    'https://c1.staticflickr.com/8/7142/13999009285_f554bb460e_z.jpg',
  ],
  // DnD
  [
    'https://media.giphy.com/media/l0ExsgrTuACbtPaqQ/giphy.gif',
    'https://media.giphy.com/media/3oriNPdeu2W1aelciY/giphy.gif',
    'https://c1.staticflickr.com/9/8414/8781200890_145f37b912_z.jpg',
  ],
  // quidditch
  [
    'https://media.giphy.com/media/8bmohJ9NabUKk/giphy.gif',
    'https://c1.staticflickr.com/6/5302/5725596856_978d97939f_z.jpg',
  ],
  // running
  [
    'https://media.giphy.com/media/l2Sqc3POpzkj5r8SQ/giphy.gif',
    'https://media.giphy.com/media/lRnUWhmllPI9a/giphy.gif',
    'https://media.giphy.com/media/tBb19f74gLy3DhI2OGY/giphy.gif',
  ],
  // blokus
  [
    'http://media.webcollage.net/rwvfp/wc/cp/18717201/module/mattel/_cp/products/1432689634844/tab-913c3b67-7430-45dd-aa88-85c7be8df4db/18d99264-8723-4d2e-bec8-795110b608d4.tif.w480.jpg',
    'https://c1.staticflickr.com/6/5007/5338494762_ac334d2b84_z.jpg',
    'https://c1.staticflickr.com/6/5044/5379127407_2944cfde68_z.jpg',
  ],
];

const randomCategoryImg = (categoryId) => {
  return sample(defaultImageUrls[categoryId]);
};

module.exports = {
  updateEventFull,
  boundingBox,
  randomCategoryImg,
};
