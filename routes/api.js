// routes/api.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');

router.get('/data', apiController.getData);

module.exports = router;
