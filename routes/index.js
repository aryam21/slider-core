'use strict';
const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');
const authRouter = require('./api/auth.routes');
const presentationRouter = require('./api/presentation.routes');
const publicPresentationRouter = require('./api/publicPresentation.routes');

router.use('/auth', authRouter);
router.use('/presentations', authService.checkTokenMW, presentationRouter);
router.use('/public-presentations', publicPresentationRouter);

module.exports = router;
