
const express = require('express');
const multer = require('multer');

const { uploadFile } = require('../controllers/uploadController');

const uploadRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

uploadRoutes.post('/upload-to-s3', upload.single('file'), uploadFile)


module.exports = uploadRoutes;
