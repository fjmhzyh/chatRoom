const io = require('socket.io').listen(3000);

io.sockets.on('connection',function(socket){
    socket.on('myEvent',function(content){
        console.log(content)
    })
})