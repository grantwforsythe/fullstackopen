import express from 'express';

import {
  getAll,
  addOne,
  getById,
  updateById,
  deleteById,
} from '../controllers/blog';

const router = express.Router();

router.get('/', getAll);
router.post('/', addOne);

router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

export default router;
