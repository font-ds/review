const http = require('http');

function handleReequest(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');

res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

res.write('<script>alert("反射型 XSS 攻击")</script>');

res.end();

}

const server = new http.Server();

server.listen(8001, '127.0.0.1');

server.on('request', handleReequest);