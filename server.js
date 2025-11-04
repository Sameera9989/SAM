const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors'); // Install with: npm install cors
const connectDB = require('./config/db');

const app = express();

// Allow requests from React frontend
app.use(cors({
  origin: [
    'http://localhost:3000', // Dev
    'https://your-frontend.vercel.app' // Prod
  ],
  credentials: true
}));

app.use(express.json());

// Health endpoint
app.get('/api/health', (req, res) => {
  res.send('Backend is running');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/dishes', require('./routes/dishRoutes'));

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});