class FileUploadController {
  constructor(swarmService, signatureService) {
    this.swarmService = swarmService;
    this.signatureService = signatureService;
  }

  uploadFile(model, response) {
    const digitalProfile = {
      version: '0.1',
      profile: {
        name: model.name,
        surname: model.lastname,
        issuer: model.issuer,
        issuerSignature: model.issuerSignature,
        date: model.date,
        items: model.items,
        grade: model.grade,
        studentNumber: model.studentNumber,
        universityName: model.universityName,
        issuerAuthority: model.issuerAuthority
      },
      kryptedSignature: ''
    };

    digitalProfile.kryptedSignature = this.signatureService.sign(digitalProfile);

    const dir = {
      '/digitalProfile.ked': {
        type: 'application/json',
        data: JSON.stringify(digitalProfile)
      }
    };
    this.swarmService.uploadToSwarm(dir)
      .then(result => {
        return response.status(200).json({ uploadedFile: digitalProfile, hash: result });
      })
      .catch(err => {
        return response.status(500).json({ error: err, file: digitalProfile });
      });
  }

  registerRoute(app) {
    app.post('/', (req, res, next) => {
      return this.uploadFile(req.body, res);
    });
  }
}

module.exports = FileUploadController;