const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/imageUpload', upload.single('image'), uploadController.uploadImage);
router.post('/fileUpload', upload.single('file'), uploadController.uploadFile);

module.exports = router;