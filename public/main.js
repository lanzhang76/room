var socket = io();
var openning = ['Look! ', "It's pouring outside, "]
var ending = [' walked in to the space.', ' heard about the event and came to the show.', ' showed up at the MFA Design and Technology Thesis show.']


$(document).ready(function() {
    $.ajax({
        url: window.location + "projs",
        type: "GET",
        success: function(data){
            data.forEach(element => {
                var proj = $('<div>').addClass('proj').text(element).attr("id",element.replace(/\s/g , "-"));
                $('#proj-container').append(proj);
                proj.click(function(){
                    socket.emit('check', {name: element});
                })
            });
        }
    });
});

function pickCombo(a, b) {
    var a_word = a[Math.floor(Math.random() * a.length)]
    var b_word = b[Math.floor(Math.random() * b.length)]
    return [a_word, b_word]
}

var isChatting = false;
$('#people').click(function(){
    isChatting = !isChatting;
    if(isChatting){
        $('.messages-container').addClass('open');
        scrollToBottom(600);
    }else{
        $('.messages-container').removeClass('open');
    }
})

// when connects, emits to the server the random combination 
// updates on all clients' interface
socket.emit('join', pickCombo(openning, ending));
socket.on('join', function (msg) {
    $('#messages').append($('<span>').text(msg));
    scrollToBottom(600);
});

// receive disconenction message from the server then displays it
socket.on('disconnect', function (msg) {
    $('#messages').append($('<span>').text(msg));
    scrollToBottom(600);
});

socket.on('check', function (msg) {
    $('#messages').append($('<span>').text(msg));
    scrollToBottom(600);
});

socket.on('count', function (msg) {
    var count_msg = `Currently, there ${getBe(msg.connections)} ${msg.connections} people in the exhibition.`
    $('#people').text(count_msg);
});

function scrollToBottom(time){
    $("#messages").animate({ scrollTop: $("#messages").prop('scrollHeight') }, time, 'linear');
}

function getBe(number){
    return number > 1 ? 'are' : 'is';
}


