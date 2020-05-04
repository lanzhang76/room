var rand = require('./random');

exports.totalcount = (num) => {
  var count_sent = '';
  var messages = (num_users) => {
    var message = rand.rand([
      `It’s a lively day at Hindsight 2020. ${num_users} people at the show!`,
      `Things are really picking up! ${num_users} people gather.`,
      `Come one, come all! ${num_users} people meet up at Hindsight 2020.`,
      `Friends, families, strangers, neighbors...${num_users} art enthusiasts fill the space.`,
    ]);
    return messgae;
  };

  if (num == 5) {
    count_sent = messaged(num);
  } else if (num == 10) {
    count_sent = messaged(num);
  } else if (num == 20) {
    count_sent = messaged(num);
  } else if (num == 50) {
    count_sent = messaged(num);
  }
  // Should return '' if no special event happens
  return count_sent;
};
