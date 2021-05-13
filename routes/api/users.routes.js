// 'use strict';

const express = require('express');
const router = express.Router();

const router = express.Router();

router.post('/{any}', (req, res)=>{
    res.json("profile");
});




module.exports = router;
