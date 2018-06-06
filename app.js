const express = require('express'),
  bodyParser = require('body-parser'),
  FileUploadController = require('./controllers/fileupload'),
  FileDownloadController = require('./controllers/filedownload'),
  SwarmService = require('./services/swarm-service'),
  SignatureService = require('./services/signature-service'),
  app = new express();

// change provider
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
new FileUploadController(SwarmService, SignatureService).registerRoute(app);
new FileDownloadController(SwarmService, SignatureService).registerRoute(app);

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app