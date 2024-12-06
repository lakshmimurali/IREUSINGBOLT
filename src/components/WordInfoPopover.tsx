import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WordInfo } from '../types';

interface WordInfoPopoverProps {
  wordInfo: WordInfo;
  position: { x: number; y: number };
  onClose: () => void;
  onAddNote: (note: string) => void;
}

export function WordInfoPopover({ wordInfo, position, onClose, onAddNote }: WordInfoPopoverProps) {
  const [note, setNote] = useState('');

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onAddNote(note.trim());
      setNote('');
    }
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl p-4 max-w-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y + 10}px`
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold">{wordInfo.word}</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      {wordInfo.pronunciation && (
        <div className="mb-2">
          <span className="text-gray-600">Pronunciation: </span>
          <span>{wordInfo.pronunciation}</span>
        </div>
      )}
      
      {wordInfo.meaning && (
        <div className="mb-2">
          <span className="text-gray-600">Meaning: </span>
          <span>{wordInfo.meaning}</span>
        </div>
      )}
      
      {wordInfo.expansion && (
        <div className="mb-2">
          <span className="text-gray-600">Expansion: </span>
          <span>{wordInfo.expansion}</span>
        </div>
      )}

      <form onSubmit={handleSubmitNote} className="mt-3">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}