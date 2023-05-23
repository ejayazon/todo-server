const express = require('express');
const router = new express.Router();
const controller = require('./controller');

router.get('/:id', controller.get);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);
router.get('/', controller.list);
router.post('/', controller.create);

module.exports = router;
