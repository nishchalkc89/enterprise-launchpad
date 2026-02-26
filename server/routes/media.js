const express = require('express');
const multer = require('multer');
const Media = require('../models/Media');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const files = await Media.findAll({ order: [['createdAt', 'DESC']] });
  res.json(files);
});

router.post('/', upload.single('file'), async (req, res) => {
  const media = await Media.create({ url: '/uploads/' + req.file.filename });
  res.json(media);
});

router.delete('/:id', async (req, res) => {
  await Media.destroy({ where: { id: req.params.id } });
  res.json({ message: 'deleted' });
});

module.exports = router;
