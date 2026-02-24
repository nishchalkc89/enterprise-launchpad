const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
    companyName: String,
    pocName: String,
    phone: String,
    email: String,
});

module.exports = mongoose.model("Settings", SettingsSchema);