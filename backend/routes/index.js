const express = require('express');
const router = express.Router();

const chatRoutes = require('./chatRoutes');
const roomRoutes = require('./roomsRoutes');
const userRoutes = require('./userRoutes');

router.use('/chat', chatRoutes);
router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);

module.exports = router;
