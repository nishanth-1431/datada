import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { scanUrl } from './scanner.js';
import { getDemoData } from './demo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // Logging

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health Check Endpoint (Observability)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Datada API is running. use /api/scan to scan a URL.');
});

// Scan Endpoint with Input Validation
app.post(
  '/api/scan',
  [
    body('url').isString().trim().notEmpty().withMessage('URL is required').isURL({ require_protocol: false, require_valid_protocol: false }).withMessage('Must be a valid URL format'),
    body('consent').isBoolean().equals('true').withMessage('You must provide consent to scan this URL.')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url } = req.body;

    try {
      const results = await scanUrl(url);
      
      // Log anonymously
      console.log(`Scan performed on ${url} - Status: ${results.status}`);
      
      res.json(results);
    } catch (error) {
      console.error(`Scan Error [${url}]:`, error.message);
      next(error); // Pass to centralized error handler
    }
  }
);

// Demo Endpoint
app.get('/api/demo', (req, res) => {
  const data = getDemoData();
  res.json(data);
});

// Centralized Error Handling Middleware (Reliability)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err);
  res.status(500).json({
    error: 'An internal server error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Please try again later.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
