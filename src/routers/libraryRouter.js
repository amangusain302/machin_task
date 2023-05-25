const express = require('express');
const {libraryValidation} = require('../middlewares/validation');
const authorization = require('../middlewares/authorization');
const { addNewBook, getBooks, jsTask } = require('../controllers/libraryController');
const router = express.Router();

router.post('/book/add', authorization, libraryValidation, addNewBook );
router.get('/books', authorization, getBooks );
router.get('/jstask', jsTask );
module.exports = router;