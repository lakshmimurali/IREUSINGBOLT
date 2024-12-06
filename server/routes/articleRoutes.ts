import express from 'express';
import { articleController } from '../controllers/articleController';

const router = express.Router();

router.post('/', articleController.createArticle);
router.get('/', articleController.getAllArticles);

export default router;