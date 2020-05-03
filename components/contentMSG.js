var rand = require('./random');

exports.content = (user, content) => {
  var user_id = user;
  var author_id = content[1];
  var content_id = content[0];
  var msg = rand.rand([
    `${user_id} checks out ${content_id} by ${author_id}`,
    `${user_id} checks  out ${author_id}’s ${content_id}`,
    `${user_id} leans in for a closer look, captivated by ${author_id}’s ${content_id}`,
    `${user_id} is viewing ${content_id} by ${author_id}.`
  ]);
  return msg;
};
