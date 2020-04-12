var socket = io();
var openning = ['Look! ', "It's pouring outside, "]
var ending = [' walked in to the space.', ' heard about the event and came to the show.', ' showed up at the MFA Design and Technology Thesis show.']

var projs = [];
var isChatting = false;
$(document).ready(() => {
    $.ajax({
        url: "/projs",
        type: "GET",
        success: data => {
            data.forEach(element => {
                var id = element.replace(/\s/g , "-");
                var proj = $('<div>').addClass('proj').text(element).attr("id", id);
                projs.push(proj);
                $('#proj-container').append(proj);
                proj.click(function(e){
                    history.pushState({page: 2}, "element", "/" + id);
                    socket.emit('check', {name: element});
                    // 
                    $('.proj').each(function( index, el ) {
                        if(el == e.target) {
                            $(el).addClass('focus');
                            $('#back-button').removeClass('hide');
                        }else{
                            $(el).addClass('hide');
                        }
                    });
                })
            });
            if(window.location.pathname.split('/')[1] != ''){
                $( '#' + window.location.pathname.split('/')[1] ).click ();
            }
        }
    });

    $('#people').click(function(){
        isChatting = !isChatting;
        if(isChatting){
            $('.messages-container').addClass('open');
            scrollToBottom(600);
        }else{
            $('.messages-container').removeClass('open');
        }
    })

    $('#back-button').click(function(){
        history.pushState({page: 1}, "element", "/");
        $('.proj').each(function( index, el ) {
            $(el).removeClass('focus');
            $(el).removeClass('hide');
            $('#back-button').addClass('hide');
        });
        socket.emit('hall');
    })

});

function pickCombo(a, b) {
    var a_word = a[Math.floor(Math.random() * a.length)]
    var b_word = b[Math.floor(Math.random() * b.length)]
    return [a_word, b_word]
}

// when connects, emits to the server the random combination 
// updates on all clients' interface
socket.emit('join', pickCombo(openning, ending));

socket.on('join', updateChat);

// receive disconenction message from the server then displays it
socket.on('disconnect', updateChat);

socket.on('check', updateChat);

socket.on('hall', updateChat);

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

function updateChat(msg){
    $('#messages').append($('<span>').text(msg));
    scrollToBottom(600);
}


