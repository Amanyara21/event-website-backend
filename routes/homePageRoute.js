const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');
const fetchUser= require('../middlewares/fetchUser')

// For File
router.post('/files',fetchUser, homePageController.createFile);
router.get('/files', homePageController.getAllFiles);
router.get('/files/:id', homePageController.getFileById);
router.delete('/files/:id',fetchUser, homePageController.deleteFileById);

// For Poster
router.post('/posters', fetchUser, homePageController.createPoster);
router.get('/posters', homePageController.getAllPosters);
router.get('/psoters/:id', homePageController.getPosterById);
router.delete('/posters/:id',fetchUser, homePageController.deletePosterById);

module.exports = router;
