# Datada - Ethical Web Scanner

Datada is a full-stack web application designed for students and cybersecurity awareness. It performs non-intrusive, ethical reconnaissance on web targets to analyze their security posture, technology stack, and infrastructure.

## My Hackathon Journey

> *This section details the journey of building Datada during the hackathon.*

### The Inspiration
We wanted to create a tool that makes cybersecurity reconnaissance accessible and easy to understand for students, without requiring complex command-line tools. We focused on building a clean UI that scores a target based on missing security headers, invalid SSL certificates, and leaked technology stacks.

### Photos from the Event
*(Replace the links below with your actual hackathon photos)*

![Hackathon Team](/path/to/your/team-photo.jpg)
![Working Late](/path/to/your/working-photo.jpg)

### Participation Certificate
*(Replace the link below with your actual certificate image or PDF)*

![Participation Certificate](/path/to/your/certificate.png)

---

## Technical Architecture & Security Posture

Datada is built with a focus on security, reliability, and performance:

- **Frontend**: Modern, responsive UI built with React + Tailwind CSS (Vite).
- **Backend**: Stateless Node.js (Express) API.
- **Security**: 
  - Strict input validation using `express-validator`.
  - Content Security Policy and HSTS headers enforced via `helmet`.
  - Rate limiting applied to prevent abuse (100 requests per 15 minutes).
  - Dependencies are audited and free of known high-severity vulnerabilities.
- **Reliability & Performance**:
  - Centralized error handling prevents stack traces from leaking.
  - External API calls use exponential backoff and retry logic via `axios-retry`.
  - Repeated URL scans are cached for 10 minutes using `node-cache` to reduce latency and load.
- **Observability**:
  - `morgan` used for access logging.
  - Health check endpoint available at `/api/health` for uptime monitors.

## Setup & Running

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Environment Variables
Create a `.env` file in the `server` directory using the provided `.env.example`:
```bash
cp server/.env.example server/.env
```

### 3. Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Start the Development Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

## Launch Readiness & QA

### Testing
Unit tests cover the critical paths of the API (input validation, health checks). Run them using:
```bash
cd server
npm run test
```

### Deployment
1. Set up a reverse proxy (e.g., Nginx) or use a platform like Vercel/Render.
2. Ensure HTTPS is enforced at the edge layer.
3. Set `NODE_ENV=production` in your environment variables to ensure secure error handling.

## Ethical Disclaimer
This tool is strictly for educational and defensive purposes. Scanning targets without permission is illegal. The author holds no responsibility for misuse of this tool.
