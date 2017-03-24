
var chat = {
    socket:null,
    userId:null,
    userName:null,
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
}

//初始化
chat.init();

// 发送消息
var sendBtn = document.querySelector('.chatBox-btn-send');
var textarea = document.querySelector('.textarea');
sendBtn.addEventListener('click',function(){
    chat.sendMsg();
})
textarea.onkeydown = function(e){
    var e = e || window.event
    if(e.keyCode == 13){
        // 阻止回车换行
        e.cancelBubble=true;
        e.preventDefault();
        e.stopPropagation();
        chat.sendMsg();
    }
}

// 获取DOM元素
var chatBox = document.querySelector('.chatBox');
var chatBoxTitle = document.querySelector('.chatBox-title');

// 获取浏览器宽高
var bWidth = document.documentElement.clientWidth;
var bHeight = document.documentElement.clientHeight;

// 窗口居中
function autoCenter(){
    var x = (bWidth - chatBox.offsetWidth) / 2;
    var y = (bHeight - chatBox.offsetHeight) / 2;
    chatBox.style.left = x + "px";
    chatBox.style.top = y + "px";
}
autoCenter()

// 设置全局变量
var draggable = false;
var Left = 0;
var Top = 0;

// 鼠标按下
chatBoxTitle.addEventListener('mousedown',function(event){
    var e = event || window.event
    // 计算鼠标距离chatBox的大小
    Left = e.pageX - chatBox.offsetLeft;
    Top = e.pageY - chatBox.offsetTop;
    draggable = true;
})

// 鼠标移动
document.onmousemove = function (event){
    if(draggable){
        var e = event || window.event;
        var maxX = bWidth - chatBox.offsetWidth;
        var maxY = bHeight - chatBox.offsetHeight

        var x = e.pageX - Left;
        var y = e.pageY - Top;

        var x = Math.min( maxX, Math.max(0,x) )
        var y = Math.min( maxY, Math.max(0,y) )
        chatBox.style.left = x + "px";
        chatBox.style.top = y + "px";
    }
}

// 鼠标松开
document.onmouseup = function (){
    draggable = false;
}


// 窗口关闭
var closeBtn = document.querySelector('.chatBox-btn-close');
var closeIcon = document.querySelector('.icon-close');

function chatBoxclose(){
    chat.socket.disconnect(true)
    chatBox.parentNode.removeChild(chatBox);
}

closeBtn.addEventListener('click',chatBoxclose)
closeIcon.addEventListener('click',chatBoxclose)


// 窗口全屏
var fullscreenIcon = document.querySelector('.icon-fullscreen');
function fullscreen (){
    chatBox.style.width = bWidth + 'px';
    chatBox.style.height = bHeight + 'px';
}
fullscreenIcon.addEventListener('click',fullscreen)