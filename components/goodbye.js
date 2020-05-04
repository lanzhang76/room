var r = require('./random');

exports.goodbye = () => {
  var farewell = [
    'feeling inspired.',
    'still thinking about the last piece they saw.',
    'with a new appreciation for design...and pockets full of macarons (shhh).',
    'ready to tell their friends all about it.',
    "to tell their family to stop by next time they're in town",
    'feeling excited.',
    'ready to start their own project.',
  ];
  return r.rand(farewell);
};
