

const s3 = require('../utils/s3');
const { v4: uuidv4 } = require('uuid');

module.exports.uploadFile = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileKey = `uploads/${uuidv4()}-${req.file.originalname}`;

        await s3.putObject({
            Bucket: "file-system",
            Key: fileKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }).promise();

        res.json({ message: "file uploaded successfully", key: fileKey });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'S3 upload failed', error: err.message });
    }

}