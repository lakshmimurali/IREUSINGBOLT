import { Article } from '../models/Article';

export const articleService = {
  async createArticle(articleData: any) {
    const article = new Article(articleData);
    return await article.save();
  },

  async getAllArticles() {
    return await Article.find().sort({ createdAt: -1 });
  },

  async getArticleById(id: string) {
    return await Article.findById(id);
  }
};