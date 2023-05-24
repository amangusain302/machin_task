const express = require("express");
const router = express.Router();
const authorRoute = require('./src/routers/authorRouter')
const adminRoute = require('./src/routers/adminRouter')

router.use('/author', authorRoute);
router.use('/admin', authorRoute);
module.exports = router;