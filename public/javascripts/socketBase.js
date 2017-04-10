module.exports = function (io) {
  io.on('connection', function(socket)
  {
          socket.on('game', function(msg)
          {
            var x = {}
            try{
              x = JSON.parse(msg)
              request.post({url:'http://localhost:8000/game/', json: x }, function optionalCallback(err, httpResponse, body)
              {
                if (err)
                {
                  return console.error('upload failed:', err);
                }
                // Print the error if one occurred
                io.emit('chat message',JSON.stringify( httpResponse.body));
              })
            }catch(err){
              io.emit('chat message',"error json format");
            }
      }
      )

      socket.on('chat', function(msg)
      {
        console.log(msg)
        if(socket.room == undefined){
          socket.room = "public"
          socket.join(socket.room)
        }
        if(socket.name == undefined){
          socket.name = "Anonymous"
        }
        io.in(socket.room).emit('chat', socket.name+":"+msg.msg);
      })
      socket.on('join', function(room)
      {

            socket.leave(socket.room)
            socket.name = room.name;
            socket.room = room.join;
            socket.join(socket.room);
            io.in(socket.room).emit('chat', socket.name + " Has joined");
      })
      socket.on('disconnect', function(){
        io.in(socket.room).emit('chat', socket.name + " Has left");
        delete socket
       });
  });
};
