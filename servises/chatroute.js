const express = require('express');
const { getQuestion, handleResponse } = require('./chatControllers');

const router = express.Router();

router.get('/question/:page/:id', getQuestion);
router.get('/response', handleResponse);

module.exports = router;
