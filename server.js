const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const moment = require('moment');


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


// 设置监听
io.on('connection', function(client){

  client.on('login', (user) => {
      client.name = user.id;
      if(!onlineUsers.hasOwnProperty(user.id)){
           var num = Math.random()*70|0;
            onlineUsers[user.id] = {
                name:user.name,
                src: "image/" + num + '.jpg' || "image/" + num + '.png'
            }
			onlineCount++;
      };
      client.broadcast.emit('welcome',user);
      console.log(user.name+' 加入聊天室');
  });

  client.on('newMsg', (data) => {
      data.src = onlineUsers[data.id]['src'];
      client.emit('serverMsg',data);
      client.broadcast.emit('serverMsg',data);
  });

  client.on('disconnect', function(){
     if(onlineUsers.hasOwnProperty(client.name)){
            var msg = onlineUsers[client.name]
            delete onlineUsers[client.name];
			onlineCount--;
            msg.count = onlineCount;
            client.broadcast.emit('logout',msg)
            console.log(msg.name+' 离开聊天室')
      };
  });

});


server.listen(port,() => {
    console.log(`server has started on port ${port}`)
});