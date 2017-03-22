var socket = io.connect("http://localhost:3000")
socket.emit("clientMessage",'hello!')