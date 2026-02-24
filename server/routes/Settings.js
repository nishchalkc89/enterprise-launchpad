const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Settings = require("../models/Settings");

// GET SETTINGS
router.get("/", async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                companyName: "THINK Acquisition LLC",
                pocName: "William Randolph",
                phone: "(703) 819-6192",
                email: "william@thinkacquisition.net",
            });
        }

        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE SETTINGS
router.put("/", auth, async (req, res) => {
    try {
        const updated = await Settings.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;