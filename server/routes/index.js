const express = require('express');
const router  = express.Router();

/* GET home page */


router.use("/api/auth", require("./auth"))
router.use('/api/profile',require('./profile'))
router.use('/api/user',require('./user'))
router.use('/api/event',require('./event'))
// router.use('/api/maps',require('./maps'))

module.exports = router;
