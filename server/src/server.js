import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { seed } from './seed.js';
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import leadRoutes from './routes/leads.js';
import settingsRoutes from './routes/settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Auto-connect to database on incoming requests if not already connected
app.use(async (req, res, next) => {
  try {
    await connectDB(process.env.MONGO_URI);
    next();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ message: 'Database connection failed. Please verify MONGO_URI.' });
  }
});

app.get('/', (req, res) => res.json({ ok: true, message: 'SD Fire Services API is live and running!', timestamp: new Date().toISOString() }));
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'SD Fire Services API', status: 'healthy' }));

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/settings', settingsRoutes);

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err?.message });
});

// Initialize DB and listen
connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sd_services')
  .then(seed)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => console.log(`API running on port ${PORT}`));
    }
  })
  .catch(err => {
    console.error('Initial DB connect/seed warning:', err.message);
  });

export default app;

