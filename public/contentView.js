//  Client clicks on a project page
$(".projectLink").click((e) => {
    // e.preventDefault();
    var content = {
        name: e.target.getAttribute("studentName"),
        project: e.target.getAttribute("projectName"),
        url: e.target.getAttribute('href')
    }
    socket.emit("contentView", content);
});


// broadcast "who is viewing what project by whom"
socket.on("contentBroadcast", (msg) => {
    var project = msg.project
    var part1 = msg.part1;
    var part2 = msg.part2;

    // console.log(parseFromString(projectString))
    $('#messages').append($('<span>').text(` ${part1}`));
    $('#messages').append(project); // url directs to people's projects
    $('#messages').append($('<span>').text(` ${part2}`));
});
