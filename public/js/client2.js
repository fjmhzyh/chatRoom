(function(){
    // 获取DOM元素
    var chatBox = document.querySelector('.chatBox');
    var chatBoxTitle = document.querySelector('.chatBox-title');
    //函数封装
    var chat = {
        socket:null,
        userId:null,
        userName:null,
        bWidth:document.documentElement.clientWidth,
        bHeight:document.documentElement.clientHeight,
        init:function(){
            this.userId = this.genUid();
            this.userName = window.name;
            this.socket = io.connect("http://localhost:3000");
            this.socket.emit('login',{id:this.userId,name:this.userName})
            this.socket.on("welcome", function(data){
                var ul = document.querySelector('.chatBox-ul');
                var li  = document.createElement('li');
                li.classList.add('chatRoom-notice');
                li.innerHTML = data.name+ " 加入本群";
                ul.appendChild(li);
                chat.scrollToBottom()
            })
            this.socket.on("serverMsg", function(data){
                chat.insertMsg(data);
                chat.scrollToBottom()
            })
            this.socket.on('logout',function(data){
                var ul = document.querySelector('.chatBox-ul');
                var li  = document.createElement('li');
                li.classList.add('chatRoom-notice');
                li.innerHTML = data.name + " 已退出";
                ul.appendChild(li);
                chat.scrollToBottom()
            })
        },
        insertMsg:function(obj){
            var isMe = (obj.id === chat.userId)?true:false;
            var ul = document.querySelector('.chatBox-ul');
            if(isMe){
                var li  = document.createElement('li');
                li.classList.add('chatRoom-me');
                li.innerHTML = "<div class='chatRoom-user'>"+"<img src='"+obj.src+"'>"+
                            "<cite><i>"+obj.time+"</i>"+obj.name+"</cite>"+
                            "</div>"+"<div class='chatRoom-user-text'>"+obj.info+"</div>";
                ul.appendChild(li);
            }else{
                var li  = document.createElement('li');
                li.innerHTML = "<div class='chatRoom-user'>"+"<img src='"+obj.src+"'>"+
                            "<cite>"+obj.name+"<i>"+obj.time+"</i></cite>"+
                            "</div>"+"<div class='chatRoom-user-text'>"+obj.info+"</div>";
                ul.appendChild(li);
            }
        },
        sendMsg:function(info){
            var info = textarea.value.trim();
            if(info){
                var msg ={
                    id:this.userId,
                    name:this.userName,
                    info:info,
                    time:moment().format('YYYY-MM-DD HH:mm:ss')
                }
                this.socket.emit('newMsg',msg)
                textarea.value = "";  
                textarea.focus();
            }else{
                return;
            }
        },
        scrollToBottom:function(){
            var content = document.querySelector('.chatBox-content-main');
            content.scrollTop = content.scrollHeight;
        },
        genUid:function(){
            return new Date().getTime()+""+Math.floor(Math.random()*899+100);
        },
        autoCenter:function(){
            var x = (this.bWidth - chatBox.offsetWidth) / 2;
            var y = (this.bHeight - chatBox.offsetHeight) / 2;
            chatBox.style.left = x + "px";
            chatBox.style.top = y + "px";
        }
    }
    //初始化socket连接
    chat.init();
})()