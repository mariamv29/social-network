const router = require('express').Router();
const thoughtRoutes = require('./thought-router');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
// add prefix of `/users` to routes created in `users-routes.js`
router.use('/users', userRoutes);

module.exports = router;