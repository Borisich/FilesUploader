var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');


var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

//var accessData = require('./accessData.json');
//var sha256 = require ('js-sha256');
app.use(fileUpload());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
  console.log('Upload REQUEST getted');

  //set the appropriate HTTP header
  //res.setHeader('Content-Type', 'text/html');

  if (!req.files) {
    //return res.status(400).send('No files were uploaded.');
    return res.send('No files were uploaded.');
    //return res.json({foo : 'bar'});
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  if (!sampleFile) {
    //return res.send('No files were uploaded.');
    //return res.json({foo : 'bar'});
    return res.send('No files');
  }
  for (var i = 0; i < sampleFile.length; i++) {
    console.log(sampleFile[i].name);
  }
  //console.log(sampleFile); // the uploaded file object
  // Use the mv() method to place the file somewhere on your server
  for (var i = 0; i < sampleFile.length; i++) {
    sampleFile[i].mv(sampleFile[i].name, function(err) {
      if (err)
        return res.status(500).send(err);


    });
    res.write('File '+sampleFile[i].name+' uploaded!');
  }
  res.end();

});
