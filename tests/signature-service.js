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
    signatureService = proxyquire('../services/signature-service', {
    });
  });
  describe('create a new signature', () => {
    it('should object signature equal crypto', (done) => {
      // Act
      const result = signatureService.sign('Pikachu');
      
      // Expected string is pre-calculated on a fact the current secret is going to be used in all environments.
      // This test might be broken if the private key is changed.
      assert.equal(result , 'qSnDdINJT8kJlVz1s0fRRLxLTrKGWDL4Zc6AWzUov3w=');
      done();
    });
  });
});