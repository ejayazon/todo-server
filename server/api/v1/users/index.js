const express = require('express');
const router = new express.Router();
const controller = require('./controller');

router.get('/:id', controller.get);

module.exports = router;
