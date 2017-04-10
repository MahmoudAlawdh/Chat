var socket = io();

$(document).ready(function() {
  $(".loginForm").submit(function(){
    var Login = {name:$("#Username").val(),join:$('#Channel').val()}
    console.log(Login)
    socket.emit('join', Login);
    $("body").css("background-color","white");
    $(".login").hide()
    $(".chat").css("visibility","visible");
    return false
  })


  $("#input").submit(function(){
    var m = {room:"chat",msg:$('#m').val()}
    socket.emit('chat', m);
    $('#m').val('');
    return false;
  });


  socket.on("chat", function(msg){
    console.log(msg)
    $('.messages').append($('<a class="list-group-item">').text(msg));
    window.scrollTo(0, $('.msgs')[0].scrollHeight); // values are x,y-offset
  });



  $("#channels").submit(function(){
    var m = {name:$("#n").val(),join:$('#c').val()}
    socket.emit('join', m);
    $('#c').val('');
    $('#m').val('');
    return false;
  });

});
