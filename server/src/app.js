import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import Routes
import authRoutes from './routes/authroutes.js';
import trackerRoutes from './routes/trackerroutes.js';
import analyticsRoutes from './routes/analyticsroutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes

app.use('/api/auth', authRoutes);
app.use('/api/trackers', trackerRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

export default app;