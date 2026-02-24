const express = require("express");
const multer = require("multer");
const Media = require("../models/Media");

const router = express.Router();

// STORAGE
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// GET MEDIA
router.get("/", async (req, res) => {
    const files = await Media.find().sort("-createdAt");
    res.json(files);
});

// UPLOAD MEDIA
router.post("/", upload.single("file"), async (req, res) => {
    const media = await Media.create({
        url: "/uploads/" + req.file.filename
    });

    res.json(media);
});

// DELETE MEDIA
router.delete("/:id", async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
});

module.exports = router;