var express = require('express');
var app = express();

var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

//var accessData = require('./accessData.json');
//var sha256 = require ('js-sha256');

app.set('port', (process.env.PORT || 80));

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*io.on('connection', function (socket) {
    socket.on('login-data', function (data) {
      var sendResponse = function(){
        if ((data.login == accessData.login)&&(data.password == sha256(accessData.password))) {
          socket.emit('result','OK')
        }
        else {
          socket.emit('result','WRONG');
        }
      }
      setTimeout(sendResponse, 1000);
    });
});*/

app.post('/upload', function(req, res) {
  console.log('UPLOAD request getted');
});