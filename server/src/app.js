import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// IMPORT ROUTES
import authRoutes from './routes/authroutes.js';
import trackerRoutes from './routes/trackerroutes.js';
import analyticsRoutes from './routes/analyticsroutes.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//
// SECURITY HEADERS
//
app.use(helmet());


//
// RATE LIMITING
//
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins

  max: 100,

  message: {
    success: false,
    message:
      'Too many requests, please try again later',
  },
});

app.use(limiter);




// ROUTES

app.use('/api/auth', authRoutes);
app.use('/api/trackers', trackerRoutes);
app.use('/api/analytics', analyticsRoutes);

// ERROR HANDLER
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API Running...');
});

export default app;