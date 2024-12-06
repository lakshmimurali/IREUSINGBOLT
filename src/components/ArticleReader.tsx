import React, { useEffect, useState } from 'react';
import { useWordInfo } from '../hooks/useWordInfo';
import { WordInfoPopover } from './WordInfoPopover';

interface ArticleReaderProps {
  content: string;
  onAddNote?: (word: string, note: string) => void;
}

export function ArticleReader({ content, onAddNote }: ArticleReaderProps) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { wordInfo, loading, error, fetchWordInfo } = useWordInfo(content);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const text = selection.toString().trim();
    if (!text) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY
    });

    setSelectedText(text);
    fetchWordInfo(text);
  };

  const handleAddNote = (note: string) => {
    if (onAddNote) {
      onAddNote(selectedText, note);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, [content]);

  return (
    <div className="relative">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {loading && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          Loading word information...
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 text-red-600 p-4 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {wordInfo && (
        <WordInfoPopover
          wordInfo={wordInfo}
          position={position}
          onClose={() => setSelectedText('')}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}