(function(){
    var getDom = function(selector){
        return  document.getElementById(selector)
    }
    var login = function(){
            var userName = getDom('userName').value;
            window.name = userName;
            window.location = "chat.html";
    }
    getDom('login').addEventListener('click',login)
    getDom('userName').onkeydown = function(e){
        e = e || window.event;
		if (e.keyCode === 13) {
			login();
		}
    }
})()