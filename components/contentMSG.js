var r = require("./random");

exports.content = (user, content) => {
    var user = user;
    var student = content.name;
    var project = content.project;
    var url = content.url;

    var msg = `<p>${user} is viewing <a href="${url}">${project}</a> by ${student}.</p>`
    return msg
}