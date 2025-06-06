// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/youtube', async (req, res) => {
  const query = req.query.q;

  if (!query) return res.status(400).json({ error: 'Missing search query (q)' });

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10, // You can change this to 5 or 10 if needed
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('YouTube API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'YouTube API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
