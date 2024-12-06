import axios from 'axios';
import { Article, WordInfo } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = {
  articles: {
    getAll: () => 
      axios.get<Article[]>(`${API_URL}/articles`).then(res => res.data),
    
    create: (article: Omit<Article, 'id' | 'createdAt'>) =>
      axios.post<Article>(`${API_URL}/articles`, article).then(res => res.data),
    
    getById: (id: string) =>
      axios.get<Article>(`${API_URL}/articles/${id}`).then(res => res.data)
  },
  
  wordInfo: {
    get: (word: string, context: string) =>
      axios.post<WordInfo>(`${API_URL}/word-info`, { word, context })
        .then(res => res.data)
  }
};