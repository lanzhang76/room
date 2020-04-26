var r = require("./random");

exports.goodbye = () => {
    var farewell = ['feeling inspired.', "still thinking about the last piece he saw."]
    return r.rand(farewell);
}