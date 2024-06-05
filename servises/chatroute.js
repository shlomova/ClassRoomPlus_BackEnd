const express = require('express');
const { getQuestion, handleResponse } = require('./chatControllers');

const router = express.Router();

router.get('/question/:id', getQuestion);
router.post('/response', handleResponse);

module.exports = router;
