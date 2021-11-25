const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');
const dashRoutes = require('./dashRoutes');

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/dash', dashRoutes);

module.exports = router;