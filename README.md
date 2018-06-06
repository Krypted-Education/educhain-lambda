![Build Status](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidHFjYU12ZThwM01SZkZhMklwQmdwUWhwUDlMeDBGWENRUDVXWlRNQndnYS9HSmNOWnZibDZuc29QRUtaVTNDQmQxaDZVRmJnSzlLeHlMVWRWR1FHSWZ3PSIsIml2UGFyYW1ldGVyU3BlYyI6InViUUJVYmUxM21sWCtHbXMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

# Educhain FileUpload/Download Function

This application is intended to be used only for upload/download certificates.

# How to Run

Run `npm install` then `npm test` to run all the tests.

Run `npm run start:dev` to execute the non-lambda function standalone nodejs server.

# Endpoints

Base url : `https://eys7kgs6t2.execute-api.eu-west-2.amazonaws.com/Prod/`

#### GET Document
`?hash=HASH-KEY`

[Example Certificate](https://eys7kgs6t2.execute-api.eu-west-2.amazonaws.com/Prod/?hash=b10e383700d90aab8b2e2a7546174eb9b26d997b7d32e33ba7523830a7464cff)

#### POST Document
Contract:
```json
{
  "name": "string",
  "lastname": "string",
  "issuer": "string",
  "issuerSignature": "string",
  "date": "string",
  "items": "array",
  "grade": "string",
  "studentNumber": "string",
  "universityName": "string",
  "issuerAuthority": "string",
}

```

# Contribute

* Fork the repo.
* Make your changes, make sure the unit tests are there.
* Create a pull request.
