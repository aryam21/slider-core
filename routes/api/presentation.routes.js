'use strict';
const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const upload = multer();
const PresentationController = require('../../controllers/index').presentation;
const uploadFile = require('../../middlewares/upload');

router.get("/pages/:offset", PresentationController.getPresentByOffset);
router.get("/slug/:slug", PresentationController.getPresentBySlug);
router.get("/:id", PresentationController.getPresentById);
router.post("/store", uploadFile.array('slider'), PresentationController.store);

module.exports = router;
