//  Client clicks on a project page
$(".projectLink").click((e) => {
    var content = {
        name: e.target.getAttribute("studentName"),
        project: e.target.getAttribute("projectName"),
        type: e.target.getAttribute("type"),
        url: e.target.getAttribute('href')
    }
    socket.emit("contentView", content);
});

// click
$('#book_hide').click(() => {
    $('.bulletin_board').toggle()
    console.log($('#book_hide').val())
    $('#book_hide').html($("#book_hide").html() === "✕" ? "✐" : "✕")
})

