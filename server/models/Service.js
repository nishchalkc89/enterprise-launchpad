const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // icon name used in frontend (lucide-react icon string)
    icon: {
      type: String,
      default: "Briefcase",
    },

    // controls order in frontend
    order: {
      type: Number,
      default: 0,
    },

    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// sort automatically by order
serviceSchema.index({ order: 1 });

module.exports = mongoose.model("Service", serviceSchema);