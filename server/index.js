var express = require('express');
var avaiableExtensions = require('./config.json');
var fileUpload = require('express-fileupload');

var app = express();
var server = require('http').createServer(app);

app.use(fileUpload());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

app.set('port', (process.env.PORT || 80));

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

isExtensionAvaiable = function(fileName) {
  let tmp = fileName.split('.');
  let extension = tmp[tmp.length-1].toLowerCase();
  return (avaiableExtensions.indexOf(extension) == -1) ? false : true;
}

app.post('/upload', function(req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (fileChooser) is used to retrieve the uploaded files
  let files = req.files.fileChooser;
  if (!files) {
    return res.status(700).send('No files were uploaded.');
  }

  if (!files.length){
    files = [].concat(files);
  }

  var totalProceed = 0;
  for (var i = 0; i < files.length; i++) {
    if (!isExtensionAvaiable(files[i].name)) {
      console.log('Extension not avaiable!');
      totalProceed++;
      res.status(600).write('File ' + totalProceed + ' (' + files[i].name + ') did not uploaded. Extension error\n');
      if (totalProceed == files.length) {
          res.end();
      }
      continue;
    }

    // Use the mv() method to place the file somewhere on your server
    files[i].mv(__dirname + '/UploadedFiles/' + files[i].name, function(err) {
      if (err) {
        console.log('ERROR');
        return res.status(500).send(err);
      }
      totalProceed++;
      res.write('File ' + totalProceed + ' uploaded!\n');
      if (totalProceed == files.length) {
          res.end();
      }
    });
  }
});
