const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const fetchUser = require('../middlewares/fetchUser');


// Create Team Route
router.post('/login', authController.login);

// Get User
router.get('/getuser',fetchUser, authController.getUser);



module.exports = router;
