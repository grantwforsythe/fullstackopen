const express = require('express');
const router = express.Router();

const notesController = require('../controllers/note');

router.get('', notesController.getAll);
router.post('', notesController.addOne);

router.get('/:id', notesController.getById);
router.put('/:id', notesController.updatedById);
router.delete('/:id', notesController.deleteById);

module.exports = router;
