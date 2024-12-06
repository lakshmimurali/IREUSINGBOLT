import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  tags: [String],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Article = mongoose.model('Article', articleSchema);