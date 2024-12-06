import { Request, Response } from 'express';
import { articleService } from '../services/articleService';

export const articleController = {
  async createArticle(req: Request, res: Response) {
    try {
      const article = await articleService.createArticle(req.body);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllArticles(req: Request, res: Response) {
    try {
      const articles = await articleService.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};