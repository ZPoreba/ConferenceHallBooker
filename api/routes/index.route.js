const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
var usersRouter = require('./users');
var roomsRouter = require('./rooms');
var reservationsRouter = require('./reservations');
var faqRouter = require('./faq');
var testAPIRouter = require("./testAPI");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/users', usersRouter);
router.use('/rooms', roomsRouter);
router.use('/reservations', reservationsRouter);
router.use('/faq', faqRouter);
router.use("/testAPI", testAPIRouter);


module.exports = router;