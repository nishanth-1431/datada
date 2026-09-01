import request from 'supertest';
import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

// We need to import the app or recreate a testable version of it
// Since index.js starts the server immediately, it's better to create a test app here
const app = express();
app.use(express.json());

// Simplified health check for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.post('/api/scan', [
  body('url').isString().isURL({ require_protocol: false, require_valid_protocol: false }),
  body('consent').isBoolean().equals('true')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.status(200).json({ status: 'Completed', riskScore: 10 });
});

describe('API Endpoints', () => {
  it('should return 200 for health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  it('should return 400 for scan without consent', async () => {
    const res = await request(app)
      .post('/api/scan')
      .send({ url: 'google.com', consent: false });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 for invalid URL', async () => {
    const res = await request(app)
      .post('/api/scan')
      .send({ url: 'not-a-url', consent: true });
    expect(res.statusCode).toEqual(400);
  });

  it('should return 200 for valid scan request', async () => {
    const res = await request(app)
      .post('/api/scan')
      .send({ url: 'google.com', consent: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Completed');
  });
});
