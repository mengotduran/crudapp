const { Router } = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
