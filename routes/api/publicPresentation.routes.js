'use strict';
const express = require('express');
const router = express.Router();
const PublicPresentationController = require('../../controllers/index').publicPresentation;

router.get("/public-slug/:slug", PublicPresentationController.getPublicPresentationBySlug);

module.exports = router;
