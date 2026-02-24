const mongoose = require("mongoose");

module.exports = mongoose.model("Media", new mongoose.Schema({
    url: String
}, { timestamps: true }));