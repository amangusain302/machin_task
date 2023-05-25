const express = require("express");
const router = express.Router();
const authorRoute = require('./src/routers/authorRouter')
const adminRoute = require('./src/routers/adminRouter')
const libraryRoute = require('./src/routers/libraryRouter')

router.use('/author', authorRoute);
router.use('/admin', adminRoute);
router.use('/library', libraryRoute);
module.exports = router;