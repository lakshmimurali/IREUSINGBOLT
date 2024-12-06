import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Article } from '../types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await api.articles.getAll();
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      const newArticle = await api.articles.create(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      setError('Failed to create article');
      console.error(err);
      throw err;
    }
  };

  return {
    articles,
    loading,
    error,
    createArticle,
    refreshArticles: fetchArticles
  };
}