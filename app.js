const express = require('express'),
  bodyParser = require('body-parser'),
  FileUploadController = require('./controllers/fileupload'),
  FileDownloadController = require('./controllers/filedownload'),
  app = new express();

// change provider
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
FileUploadController(app);
FileDownloadController(app);

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app