'use strict';
const express = require('express');
const expressSession = require('express-session');
const router = express.Router();
const uploadFile = require('../../middlewares/upload');
const authController = require('../../controllers/index').auth;

router.post('/user', uploadFile.none(), authController.login);

module.exports = router;
