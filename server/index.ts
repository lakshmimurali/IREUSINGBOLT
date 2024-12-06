import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import articleRoutes from './routes/articleRoutes';
import wordInfoRoutes from './routes/wordInfoRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/word-info', wordInfoRoutes);

// Connect to database
connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});