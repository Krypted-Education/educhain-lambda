const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  proxyquire = require('proxyquire'),
  FileDownloadController = require('../controllers/filedownload');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('FileDownload Controller', () => {
  let swarmService, signatureService, controller;

  beforeEach(() => {
    swarmService = {
      downloadFromSwarm: sinon.stub()
    };

    signatureService = {
      validateEthereumSignature: sinon.stub(),
      validateKryptedSignature: sinon.stub()
    };

    controller = new FileDownloadController();
  });

  it('should response back 400 if the hash is not present', () => {

  });
});