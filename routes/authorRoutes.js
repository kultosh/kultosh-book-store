const express = require('express');
const router = express.Router();

const authorController = require('../controllers/AuthorController');

// Author Routes
router.get('/', authorController.index);

router.get('/create', authorController.create);

router.post('/create', authorController.store);

module.exports = router;