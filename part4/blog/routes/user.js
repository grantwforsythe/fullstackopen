const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('', userController.addOne);

module.exports = router;
