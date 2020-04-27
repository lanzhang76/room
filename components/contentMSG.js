var r = require("./random");

exports.content = (user, content) => {
    var user = user;
    var student = content.name;
    var project = content.project;
    var url = content.url;

    var msg = `<span>${user} is viewing</span> <a href="${url}">${project}</a> <span>by ${student}.</span>`
    return msg
}