var r = require('./random');

exports.content = (user, content) => {
  var user = user;
  var student = content[1];
  var project = content[0];
  var msg = `${user} is viewing ${project} by ${student}.`;
  return msg;
};
