const express = require('express');
const router = express.Router();

// multer part to store image as a file inside the public folder
const Book = require('../models/book');
const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'images/gif'];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

const bookController = require('../controllers/BookController');

// Author Routes
router.get('/', bookController.index);

router.get('/create', bookController.create);

router.post('/create', upload.single('coverImage'), bookController.store);

module.exports = router;