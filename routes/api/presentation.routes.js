'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer();

var PresentaionController = require('../../controllers/index').presentation;
var uploadFile = require('../../middlewares/upload');

// router.param('slug', /^[0-9]{6}$/);

router.get("/", PresentaionController.getPresentsByUser);
router.get("/pages/:offset", PresentaionController.getPresentByOffset);
router.get("/slug/:slug", PresentaionController.getPresentBySlug);
router.get("/:id", PresentaionController.getPresentById);
router.post("/store", uploadFile.array('slider'), PresentaionController.store);

module.exports = router;
