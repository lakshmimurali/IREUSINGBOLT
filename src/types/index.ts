export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  tags: string[];
}

export interface WordInfo {
  word: string;
  pronunciation?: string;
  meaning?: string;
  expansion?: string;
  notes?: string[];
}