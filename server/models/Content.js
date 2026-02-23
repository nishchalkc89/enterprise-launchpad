const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sectionId: { type: String, required: true, unique: true },
  title: String,
  subtitle: String,
  body: String,
  visible: { type: Boolean, default: true },
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
