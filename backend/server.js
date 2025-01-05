const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
const dotenv = require('dotenv'); // Import dotenv
const routes = require('./routes');

const app = express();
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const PORT = 5000;

dotenv.config();

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.use('/api', routes);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in .env file
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Example Route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

app.post('/ask-ai', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Call OpenAI API for completions
    const result = await geminiModel.generateContent(message);
    const response = result.response;

    // Send AI response back to the client
    return res.json({ answer: response.text() });
  } catch (error) {
    console.error('Error during OpenAI API request:', error);
    return res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
