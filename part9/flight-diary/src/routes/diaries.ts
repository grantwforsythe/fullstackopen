import express from 'express';
import { getDiaries, addDiary, getDiaryById } from '../controllers/diaries';

const router = express.Router();

router.get('/', getDiaries);
router.get('/:id', getDiaryById);
router.post('/', addDiary);

export default router;
