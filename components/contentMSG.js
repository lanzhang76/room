var r = require("./random");

exports.content = (user, content) => {
    var user = user;
    var student = content.name;
    var project = content.project;
    var url = content.url;
    // return r.rand(farewell);
    var msg = {
        consolemsg: `${user} is viewing ${project} by ${student}.`,
        project: `<a href="${url}">${project}</a>`,
        part1: `${user} is viewing `,
        part2: ` by ${student}.`
    }
    return msg
}