const express = require('express');
const multer = require('multer');
const { uploadFile, getAllUploads, getAnalytics } = require('../controllers/uploadController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/',verifyToken,requireRole("user"), upload.single('file'), uploadFile);
router.get('/',verifyToken,requireRole("admin"), getAllUploads);
router.get('/analytics', verifyToken, requireRole("admin"), getAnalytics);

module.exports = router;
