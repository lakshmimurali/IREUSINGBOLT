import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Article Schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// Routes
app.post('/api/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/word-info', async (req, res) => {
  try {
    const { word, context } = req.body;

    const prompt = `
      Analyze the word "${word}" in the following context:
      "${context}"
      
      Provide:
      1. Pronunciation (if applicable)
      2. Meaning in this context
      3. If it's an acronym/abbreviation, provide the correct expansion based on the context
      
      Format the response as JSON with keys: pronunciation, meaning, expansion
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});