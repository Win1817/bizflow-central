
import express from 'express';
import cors from 'cors';
import signupHandler from './src/pages/api/signup';
import loginHandler from './src/pages/api/login';

const app = express();
const PORT = 9000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// API Routes
app.post('/api/signup', signupHandler);
app.post('/api/login', loginHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
