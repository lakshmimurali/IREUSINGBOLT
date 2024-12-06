import express from 'express';
import { wordInfoController } from '../controllers/wordInfoController';

const router = express.Router();

router.post('/', wordInfoController.getWordInfo);

export default router;