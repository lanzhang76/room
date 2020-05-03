var rand = require('./random');
var gettime = require('./gettime');

exports.announceArrival = (user_id) => {
    const message = rand.rand([
        `Welcome to the show, ${user_id}!`,
        `Welcome to Hindsight 2020, ${user_id}!`,
        `Welcome to Hindsight 2020 presented by Parsons Design & Technology, ${user_id}!`,
        `Hello, ${user_id}!`,
        `Hi, ${user_id}!`,
        `Hey, ${user_id}!`,
        `Howdy, ${user_id}!`,
        `${user_id} has arrived!`,
        `${user_id} has arrived at ${gettime.getHourMinute()}`,
        `Look, it’s ${user_id}!`,
        `${user_id} has joined the show!`,
        `${user_id} steps into the exhibition lobby: “Let’s see some art!”`,
        `${user_id} enters: “Wow!”`,
        `${user_id} spots their friend at the back of the gallery.`,
        `${user_id} sees a crowd gathering. They go to check it out.`,
        `${user_id} enters, and heads straight for the snack bar: “Are those macarons!?”`,
        `Good to see you here, ${user_id}!`
    ]);
    return message;
};
