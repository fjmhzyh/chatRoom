## nodejs,express,socket.io搭建小型聊天室

#### 关于HTTP
HTTP协议（超文本传输协议）是互联网上应用最为广泛的一种网络协议。所有的WWW文件都必须遵守这个标准。

#### HTTP的局限性
HTTP是一个基于请求与响应模式的、无状态的的协议。
只有在客户端发起请求的时，才会做出响应。服务端无法主动像客户端推送信息。
服务端与客户端之间也无法建立起持久的链接。请求一响应,链接就断开。
* 参考链接  http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html

#### 关于webSockets
WebSockets协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——可以通俗的解释为服务器主动发送信息给客户端。
全双工通信也就是客户端和服务端之间可以同时相互发送信息。并且Websocket是一个持久化的协议。
可以把 WebSocket 看成是 HTTP 协议为了支持长连接所打的一个大补丁。
* 参考链接  https://www.zhihu.com/question/20215561  

#### 关于socket.io
socket.io是nodejs创建websocket服务器的标准库,socket.io提供了方便的接口,并且为不支持websocket的客户端提供了类似长轮询的的透明回调机制。
具有非常好的兼容性。
* 参考链接  https://github.com/socketio/socket.io

### 项目搭建
```bash
git clone git@github.com:fjmhzyh/react-china.git      // 将项目下载到本地
$ node server.js        // 启动项目
```
* 打开项目主页  http://localhost:3000    


### 项目预览
### 你的支持,我的动力
 * 如果觉得有帮助的话,请作者喝杯咖啡吧！
 * 感谢大家的支持,项目会继续完善,其他教程也会提交到github,欢迎关注！
 
 ![image](https://github.com/fjmhzyh/react-china/blob/master/code.jpg)

### 项目预览
![image](https://github.com/fjmhzyh/chatRoom/blob/master/chat0.png)
![image](https://github.com/fjmhzyh/chatRoom/blob/master/chat1.png)
