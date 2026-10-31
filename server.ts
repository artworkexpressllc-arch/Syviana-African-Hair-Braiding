import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { handler as appointmentHandler } from './netlify/functions/appointment-request.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoint for Appointment Requests
app.post(['/api/appointment-request', '/.netlify/functions/appointment-request'], async (req, res) => {
  try {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify(req.body),
      headers: req.headers as Record<string, string>,
    };

    const result = await appointmentHandler(event, {});
    res.status(result.statusCode);
    for (const [key, val] of Object.entries(result.headers || {})) {
      res.setHeader(key, val as string);
    }
    res.send(result.body);
  } catch (error) {
    console.error('Server error processing appointment request:', error);
    res.status(500).json({
      error: 'An unexpected error occurred. Please call Syviana Africa Hair Braiding at (708) 971-9940.',
    });
  }
});

// Serve production static assets from dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Syviana Africa Hair Braiding server running on http://localhost:${PORT}`);
});
