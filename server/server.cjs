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

// Middleware
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Connect DB & Start
const PORT = process.env.PORT || 5000;
sequelize.sync()
  .then(() => {
    console.log('MySQL connected & tables synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
