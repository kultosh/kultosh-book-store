const express = require('express');
const router = express.Router();

const bookController = require('../controllers/BookController');

// Author Routes
router.get('/', bookController.index);

router.get('/create', bookController.create);

router.post('/create', bookController.store);

module.exports = router;