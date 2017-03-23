 var socket = io.connect("http://localhost:3000")
socket.on("serverMessage", function(data){
    addMessage(data);
})
socket.on("myMessage", function(data){
    addMessage(data,'right');
})
var msgBox = document.getElementById('messages');
var lastMsgBox = null ;
function addMessage(msg,cls) {
    var newMsgBox = document.createElement('div');
    newMsgBox.classList.add('msg')
    if(cls){newMsgBox.classList.add(cls)}else{newMsgBox.classList.add('left')}
    var newMsg = document.createTextNode(msg);
    newMsgBox.appendChild(newMsg);
    msgBox.appendChild(newMsgBox);
    //  msgBox.insertBefore(newMsgBox,lastMsgBox);
    lastMsgBox = newMsgBox
}

function sendCmd(cmd,args){
    if(cmd === 'j'){
        socket.emit('join',args)
    } else{
        alert('unknow cmd: '+cmd)
    }
}

function sendMsg(msg){
    var cmdMatch = msg.match(/^\/(\w*)(.*)/);
    if(cmdMatch){
        sendCmd(cmdMatch[1],cmdMatch[2].trim())
    }else{
        socket.emit('clientMessage',msg)
    }
}

var input = document.getElementById('input');
input.onkeydown = function(event){
    if(event.keyCode == 13){
        sendMsg(input.value)
        // socket.emit('clientMessage',input.value);
        input.value = '';
        return false
    } else {
        return true
    }
}

// socket.on('connectSuccess',function(){
//     var name = prompt('请输入用户名');
//     socket.emit('login',name)
// })

