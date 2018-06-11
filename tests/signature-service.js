const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  proxyquire = require('proxyquire'),
  expect = require('chai'),
  assert = require('chai').assert;

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Signature service', () => {
  let mockedRequestPromise,
    signatureService;

  // This should run before each of all the `it` statements.
  beforeEach(() => {
    // Setup a spy on mockedRequestPromise.
    mockedRequestPromise = sinon.spy();
    // Setup the signature service instance to mock request-promise with a mocked
    // replacement.
    signatureService = {
      validateKryptedSignature : sinon.stub().returns('squirtle'),
      sign: sinon.stub().returns('squirtle'),
    };

    responseJson = sinon.stub();
    responseMock = {
      status: sinon.stub().returns({
        json: responseJson
      })
    };
  });
  describe('create a new signature', () => {
    it('should object signature equal crypto', (done) => {
      // Act
      const result = signatureService.sign('Pikachu');
      
      // Expected string is pre-calculated on a fact the current secret is going to be used in all environments.
      // This test might be broken if the private key is changed.
      assert.equal(result , 'squirtle');
      done();
    });
   it('should response back 400 if the sign is not equal crypto', (done) => {
      //Act
      result = signatureService.sign('Pikachu');
      
      //Assert
      responseMock.status.calledWith(400);
      responseJson.calledWith({ error: 'Invalid signature. Needs signature to be defined.' });
      done();
   });
  });
  describe('controll a krypted signature', () => {
    it('should object signature equal to KryptedSignature' , (done) => {
     //Act
     const result = signatureService.validateKryptedSignature('','Pikachu');
      
      //Assert
      signatureService.sign.calledWith('Pikachu') ;
      assert.equal(result,'squirtle');
      const digitalPorfileStub = {
        kryptedSignature: ''
      };
      signatureService.sign.calledWith(digitalPorfileStub);
      digitalPorfileStub.kryptedSignature = 'squirtle';
      responseJson.calledWith('squirtle')
      done();
     });
   });
    it('object signature not equal to Krypted Signature' , (done) => {
     //Act
     signatureService.validateKryptedSignature(undefined,responseMock);
     
     // Assert
     responseMock.status.calledWith(400);
     responseJson.calledWith({ error: 'undefined krypted signature' });
     done();
    });
  });