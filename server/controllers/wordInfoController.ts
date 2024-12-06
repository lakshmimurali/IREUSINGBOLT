import { Request, Response } from 'express';
import { wordInfoService } from '../services/wordInfoService';

export const wordInfoController = {
  async getWordInfo(req: Request, res: Response) {
    try {
      const { word, context } = req.body;
      const wordInfo = await wordInfoService.getWordInfo(word, context);
      res.json(wordInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};