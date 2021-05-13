'use strict';

const express = require('express');
const router = express.Router();
var uploadFile = require('../../middlewares/upload');
var output = require('../../helpers/generateOutput');


router.post('/', uploadFile.any(), (req, res) => {
    return output(res, {username: req.body.username }, false, 'Login and password are true', 200);
});


module.exports = router;
