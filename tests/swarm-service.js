const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  proxyquire = require('proxyquire');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Swarm service', () => {
  let mockedRequestPromise,
    swarmService;

  // This should run before each of all the `it` statements.
  beforeEach(() => {
    // Setup a spy on mockedRequestPromise.
    mockedRequestPromise = sinon.spy();

    // Setup the swarmservice instance to mock request-promise with a mocked
    // replacement.
    swarmService = proxyquire('../services/swarm-service', {
      'request-promise': mockedRequestPromise
    });
  });

  describe('download from swarm', () => {
    it('should make request to swarm endpoint with the hash', (done) => {
      // Act
      // Pass a meaningless parameter to test if there is any logic bound to this property.
      const result = swarmService.downloadFromSwarm('Pikachu');

      // Assert
      const expected = {
        method: 'GET',
        uri: 'https://open.swarm-gateways.net/bzz-immutable:/Pikachu/digitalProfile.ked',
        body: 'Pikachu',
        json: true
      };
      mockedRequestPromise.calledWith(expected).should.be.ok;
      done();
    });
  });

  describe('upload file to swarm', () => {
    it('should make a request with the file to get the hash', (done) => {
      // Arrange
      const file = { me: 'Secret Pokemon List' };

      // Act
      const result = swarmService.uploadToSwarm(file);

      // Assert
      const expected = {
        method: 'POST',
        uri: 'https://open.swarm-gateways.net/bzz-raw:/',
        body: { me: 'Secret Pokemon List' },
        json: true
      }
      mockedRequestPromise.calledWith(expected).should.be.ok;
      done();
    });

    // it.skip('should create the file with the hash and provided file', (done) => {
    //   done();
    //   // TODO: not finished yet.
    // });
  });

});