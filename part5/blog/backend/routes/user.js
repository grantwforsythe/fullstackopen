import express from 'express';

import { getAll, addOne } from '../controllers/user';

const router = express.Router();

router.get('/', getAll);
router.post('/', addOne);

export default router;
