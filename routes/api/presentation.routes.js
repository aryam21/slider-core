'use strict';
const express = require('express');
const router = express.Router();
const PresentationController = require('../../controllers/index').presentation;
const uploadFile = require('../../middlewares/upload');

router.get("/pages/:offset", PresentationController.getPresentByOffset);
router.get("/slug/:slug", PresentationController.getPresentBySlug);
router.post("/store", uploadFile.array('slider'), PresentationController.store);
router.get("/:slug/update/:isPrivate", PresentationController.changePresentationStat);

module.exports = router;
