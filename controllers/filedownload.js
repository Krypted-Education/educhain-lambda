class FileDownloadController {
  constructor(swarmService, signatureService) {
    this.swarmService = swarmService;
    this.signatureService = signatureService;
  }

  checkEthereumSignature(certificate) {
    return new Promise((resolve, reject) => {
      const issuer = certificate.profile.issuer;
      const issuerSignature = certificate.profile.issuerSignature;
      const isSignedByTheIssuer = this.signatureService.validateEthereumSignature(
        issuerSignature, issuer, certificate
      );

      if (!isSignedByTheIssuer) {
        return reject({ error: 'Invalid issuer certificate' });
      }
      return resolve(certificate);
    });
  }

  checkKryptedSignature(certificate) {
    return new Promise((resolve, reject) => {
      const isSignedByKrypted = this.signatureService.validateKryptedSignature(
        certificate.kryptedSignature, certificate
      );

      if (!isSignedByKrypted) {
        return reject({ error: 'Certificate not signed by Krypted.' });
      }
      return resolve(certificate);
    });
  }

  downloadFile(hash, res) {
    if (!hash || hash.length < 1) {
      return res.status(400).json({ error: 'Invalid request. Needs hash to be defined.' });
    }
    this.swarmService.downloadFromSwarm(hash)
      .then(result => {
        const fileJson = result['/digitalProfile.ked'].data,
          certificate = JSON.parse(fileJson);

        this.checkKryptedSignature(certificate)
          .then(cert => this.checkEthereumSignature(cert))
          .then(cert => res.status(200).json(cert.profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(500).json(err));
  }

  registerRoute(app) {
    app.get('/', (req, res) => {
      const hash = req.query.hash;
      this.downloadFile(hash, res);
    });
  }
}

module.exports = FileDownloadController;