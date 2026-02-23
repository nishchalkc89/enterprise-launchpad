const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    // hero, about, services, contact etc
    sectionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: String,
    subtitle: String,
    body: String,

    visible: {
      type: Boolean,
      default: true,
    },

    // flexible object for extra fields
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);