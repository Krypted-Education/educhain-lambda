const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');
const sinon = require('sinon');
const SwarmService = require('../services/swarm-service');
const SignatureService = require('../services/signature-service');

const request = supertest(app);

describe('Certificate Lambda Function', () => {
  describe('controllers', () => {
    // describe('File Download Controller', (done) => {
    //   it('should return back 400 when hash query is not present', () => {
    //     // Act
    //     request.get('/').expect(400).end((err, result) => {
    //       const errorMessage = JSON.parse(result.error.text);

    //       // Assert
    //       test.string(errorMessage.error).contains('Invalid request. Needs hash to be defined.');
    //       done();
    //     });
    //   });

    //   it('should call downloadSwarm with hash', (done) => {
    //     // Arrange
    //     const mockedCert = {
    //       '/digitalProfile.ked': {
    //         data: 'squirtle'
    //       }
    //     };
    //     const mockedPromise = new Promise(
    //       (resolve, reject) => {
    //         resolve(mockedCert);
    //       }
    //     );
    //     const downloadStub = sinon.stub(SwarmService, 'downloadFromSwarm');
    //     const kryptedStub = sinon.stub(SignatureService, 'validateKryptedSignature');
    //     const ethereumStub = sinon.stub(SignatureService, 'validateEthereumSignature');

    //     // Act
    //     request.get('/?hash=pikachu').expect(200).end((err, result) => {
    //       debugger;
    //     });
    //   });
    // });
  });
});