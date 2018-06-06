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
  let swarmService, signatureService, controller, responseSpy, responseJson;

  beforeEach(() => {
    const mockedCert = {
      '/digitalProfile.ked': {
        data: '{"profile": "squirtle"}'
      }
    };
    swarmService = {
      downloadFromSwarm: sinon.stub().resolves(mockedCert)
    };

    signatureService = {
      validateKryptedSignature: sinon.stub().resolves({ profile: 'squirtle' }),
      validateEthereumSignature: sinon.stub().resolves({ profile: 'squirtle' })
    };

    responseJson = sinon.stub();
    responseMock = {
      status: sinon.stub().returns({
        json: responseJson
      })
    };

    controller = new FileDownloadController(swarmService, signatureService);
  });

  describe('download file action', () => {
    it('should response back 400 if the hash is not present', (done) => {
      // Act
      controller.downloadFile(undefined, responseMock);

      // Assert
      responseMock.status.calledWith(400);
      responseJson.calledWith({ error: 'Invalid request. Needs hash to be defined.' });
      done();
    });

    it('should try downloading and check the signatures when hash is present', (done) => {
      // Act
      controller.downloadFile('Pikachu', responseMock);

      // Assert
      swarmService.downloadFromSwarm.calledWith('Pikachu');

      signatureService.validateKryptedSignature.calledWith({ profile: 'squirtle' });
      signatureService.validateEthereumSignature.calledWith({ profile: 'squirtle' });

      responseMock.status.calledWith(200);
      responseJson.calledWith('squirtle');
      done();
    });
  });
});