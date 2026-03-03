const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const contactRoutes = require('./routes/contact');
const serviceRoutes = require('./routes/services');
const uploadRoutes = require('./routes/upload');
const submissionRoutes = require('./routes/submissions');
const settingsRoutes = require('./routes/Settings');
const mediaRoutes = require('./routes/media');
const analyticsRoutes = require('./routes/analytics');

const app = express();


// ================================
// ✅ CORS (PREVIEW + PRODUCTION + LOCAL)
// ================================
const allowedOriginPatterns = [
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.lovable\.app$/,
  /^https:\/\/(www\.)?foxnutfusion\.com$/,
  /^https:\/\/api\.foxnutfusion\.com$/,
  /^http:\/\/localhost:\d+$/,
  /^https:\/\/localhost:\d+$/,
];

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (curl, server-to-server)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOriginPatterns.some((pattern) => pattern.test(origin));
    if (isAllowed) return callback(null, true);

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// ================================
// MIDDLEWARE
// ================================
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ================================
// ROUTES (NO CHANGE)
// ================================
app.use('/api/admin', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/analytics', analyticsRoutes);


// ================================
// HEALTH CHECK (IMPORTANT)
// ================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('✅ MySQL connected & tables synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });