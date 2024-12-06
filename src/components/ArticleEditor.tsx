import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface ArticleEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function ArticleEditor({ content, onChange }: ArticleEditorProps) {
  return (
    <Editor
      apiKey="k37bzaikponmvcvugar8wpf70ms9z2s7xjx92lz2b89krmup"
      value={content}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | help',
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; }',
        skin: 'oxide',
        icons: 'thin'
      }}
      onEditorChange={onChange}
    />
  );
}