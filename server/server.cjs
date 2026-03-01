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
// ✅ CORS FIX (LOCAL + LIVE)
// ================================
app.use(cors({
  origin: true, // allow current domain automatically
  credentials: true
}));


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