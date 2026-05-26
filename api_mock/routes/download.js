const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const router = express.Router();
const APK_PATH = process.env.APK_PATH || path.join(__dirname, '..', 'db', 'app-cybedu.apk');

router.get('/', async (req, res, next) => {
  try {
    await fs.access(APK_PATH);
    return res.download(APK_PATH, path.basename(APK_PATH));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ message: 'APK file not found' });
    }
    return next(error);
  }
});

module.exports = router;
