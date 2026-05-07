const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// ================= AUTH =================
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// ================= DASHBOARD =================
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: "Dashboard working",
    user: req.user
  });
});

// ================= USERS =================
router.get('/users', authMiddleware, UserController.getUsers);
router.post('/users', authMiddleware, UserController.addUser);
router.put('/users/:id', authMiddleware, UserController.updateUser);
router.delete('/users/:id', authMiddleware, UserController.deleteUser);

// ================= STATS =================
router.get('/stats', authMiddleware, UserController.getDashboardStats);

// ================= BOT SETTINGS =================
router.get('/bot-settings', authMiddleware, UserController.getBotSettings);
router.post('/bot-settings', authMiddleware, UserController.saveBotSettings);

module.exports = router;