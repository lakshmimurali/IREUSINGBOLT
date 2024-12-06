import { useState, useCallback } from 'react';
import axios from 'axios';
import { WordInfo } from '../types';

export function useWordInfo(content: string) {
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWordInfo = useCallback(async (word: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/api/word-info', {
        word,
        context: content
      });
      setWordInfo(response.data);
    } catch (err) {
      setError('Failed to fetch word information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [content]);

  return { wordInfo, loading, error, fetchWordInfo };
}