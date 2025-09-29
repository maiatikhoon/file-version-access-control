const AWS = require('aws-sdk');
const aws = require("../config/aws");

const s3 = new AWS.S3({
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
});


module.exports = s3;

