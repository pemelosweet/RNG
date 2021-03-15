var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
    console.log('服务端：客户端已连接 8181。');
    ws.on('message', function (message) {
        console.log(message);
        ws.send(message)//每隔5秒 服务端向浏览器 推送消息
    });
});