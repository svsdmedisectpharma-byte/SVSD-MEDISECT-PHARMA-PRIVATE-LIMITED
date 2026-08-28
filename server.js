import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { handleOpenRouterChat } from './api/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Medisect Pharma AI API' });
});

// Secure OpenRouter Streaming Chat Route
app.post('/api/chat', (req, res) => {
  handleOpenRouterChat(req, res);
});

app.listen(PORT, () => {
  console.log(`🚀 Medisect Pharma API server running on http://localhost:${PORT}`);
});
