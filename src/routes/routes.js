import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Server is live!');
});

// Example new route file
// import authRoutes from './auth.js';
// router.use('/auth', authRoutes);

module.exports = router;
