'use strict';

const express = require('express');
const router = express.Router();

const authRouter = require('./api/auth.routes');
const presentationRouter = require('./api/presentation.routes');
const customRouter = require('./api/customAuth.routes');

router.use('/login', customRouter);
router.use('/auth', authRouter);
router.use('/presentations', presentationRouter);

module.exports = router;
