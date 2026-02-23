const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Briefcase' },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
