const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');


//设置全局变量
var port = 3000;
var onlineUsers = {};
var onlineCount = 0;

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎为 ejs
app.set('view engine', 'html');


// app.get('/',(req,res) => {
//     res.render('index')
// })

// 设置监听
io.on('connection', function(client){
  //onlineUsers.push(client);
  client.on('login', (name) => {
      client.name = name;
     // client.emit('serverMessage','用户 ' + name +' 加入聊天室');
      client.broadcast.emit('serverMessage','用户 ' + name +' 加入聊天室')
  });
  client.on('clientMessage', (data) => {
      client.emit('myMessage',data)
      client.broadcast.emit('serverMessage',client.name+":"+data)
  });
  client.on('disconnect', function(){
     client.broadcast.emit('serverMessage','用户 ' + client.name +' 离开聊天室')
  });
  client.emit('connectSuccess');
});


server.listen(port,() => {
    console.log(`server has started on port ${port}`)
});