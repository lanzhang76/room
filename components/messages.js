// Exports message spans for arrive, browse, view, currentCount.

const rand = require('./random');
const user_id_anonym = '&#x2588;&#x2588;&#x2588;&#x2588;';

// ARRIVE: Guest connects for first time.
exports.arrive = function () {
  const message = rand.rand([
    `Welcome to Hindsight 2020, ${user_id_anonym}!`,
    `Welcome to the show, ${user_id_anonym}!`,
    `Welcome, ${user_id_anonym}!`,
    `Hello, ${user_id_anonym}!`,
    `Hi, ${user_id_anonym}!`,
    `Hey, ${user_id_anonym}!`,
    `Howdy, ${user_id_anonym}!`,
    `${user_id_anonym} has arrived!`,
    `Look, it’s ${user_id_anonym}!`,
    `${user_id_anonym} has joined the show!`,
  ]);
  return `<span>${message}</span>`;
};

// BROWSE: Guest views landing/exhibition/publication/presentation
// index page.
exports.browse = function (content_type) {
  let verb;
  switch (content_type) {
    case 'exhibition':
      verb = rand.rand(['browses the', 'checks out the']);
      break;
    case 'publication':
      verb = rand.rand(['browses the', 'opens the']);
      break;
    case 'presentation':
      verb = rand.rand(['browses the', 'tunes in for the']);
      break;
  }
  const message = `${user_id_anonym} ${verb} ${content_type}.`;
  return `<span>${message}</span>`;
};

// VIEW: Guest views specific project/article/video page.
exports.view = function (content_id, content_url, content_type, author_id) {
  const content_and_author = rand.rand([
    `${content_id} by ${author_id}`,
    `${author_id}'s ${content_id}`,
  ]);
  let verb;
  switch (content_type) {
    case 'exhibition':
      verb = rand.rand(['checks out', 'heads to', 'views']);
      break;
    case 'publication':
      verb = rand.rand(['checks out', 'opens', 'reads']);
      break;
    case 'presentation':
      verb = rand.rand(['checks out', 'watches', 'listens to']);
      break;
  }
  const message = `${user_id_anonym} ${verb} <a href="${content_url}">${content_and_author}</a>.`;
  return `<span>${message}</span>`;
};

// Num users - triggers/thresholds tbd
// TODO: should the trigger be inside or outside the function?
exports.currentCount = function (num_users) {
  let message = '';
  if (num_users > 5) {
    message = rand.rand([
      `${num_users} people gather at Hindsight 2020.`,
      `There are ${num_users} people at the show.`,
    ]);
  } else if (num_users > 10) {
    `Wow! It's getting busy. There are ${num_users} people at the show.`;
  }
  return `<span>${message}</span>`;
};

// Time - triggers tbd
exports.datetime = function (num_users) {};
