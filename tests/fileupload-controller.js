const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  proxyquire = require('proxyquire'),
  FileUploadController = require('../controllers/fileupload');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('FileDownload Controller', () => {
  let swarmService, signatureService, controller, responseSpy, responseJson;

  beforeEach(() => {
    swarmService = {
      uploadToSwarm: sinon.stub().resolves('Pikachu')
    };

    signatureService = {
      sign: sinon.stub().returns('squirtle')
    };

    responseJson = sinon.stub();
    responseMock = {
      status: sinon.stub().returns({
        json: responseJson
      })
    };

    controller = new FileUploadController(swarmService, signatureService);
  });

  describe('upload file action', () => {
    it('should response back 200 after successfully upload', (done) => {
      // Arrange
      const modelStub = {
        name: 'Ash',
        lastname: 'Ketchum',
        issuer: '0x0123',
        issuerSignature: 'SIGNATURE',
        date: '1234455',
        items: [],
        grade: '1.2',
        studentNumber: '123456',
        universityName: 'Kocaeli Unv.',
        issuerAuthority: 'AWESOME INC.'
      };

      // Act
      controller.uploadFile(modelStub, responseMock);

      // Assert
      const digitalProfileStub = {
        version: '0.1',
        profile: {
          name: modelStub.name,
          surname: modelStub.lastname,
          issuer: modelStub.issuer,
          issuerSignature: modelStub.issuerSignature,
          date: modelStub.date,
          items: modelStub.items,
          grade: modelStub.grade,
          studentNumber: modelStub.studentNumber,
          universityName: modelStub.universityName,
          issuerAuthority: modelStub.issuerAuthority
        },
        kryptedSignature: ''
      };
      signatureService.sign.calledWith(digitalProfileStub);

      responseMock.status.calledWith(200);
      digitalProfileStub.kryptedSignature = 'squirtle';
      responseJson.calledWith({ uploadedFile: digitalProfileStub, hash: 'Pikachu' });
      done();
    });
  });
});