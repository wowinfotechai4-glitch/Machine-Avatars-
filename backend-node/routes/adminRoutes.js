const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// ================= AUTH =================
router.post('/register', adminController.register);
router.post('/login', adminController.login);

// ================= DASHBOARD =================
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: "Dashboard working ",
    user: req.user
  });
});

// ================= USERS =================
router.get('/users', authMiddleware, adminController.getUsers); // ✅ FIXED NAME
router.post('/users', authMiddleware, adminController.addUser);
router.put('/users/:id', authMiddleware, adminController.updateUser);
router.delete('/users/:id', authMiddleware, adminController.deleteUser);

// ================= STATS =================
router.get('/stats', authMiddleware, adminController.getDashboardStats);

// ================= BOT SETTINGS =================
router.get('/bot-settings', authMiddleware, adminController.getBotSettings);
router.post('/bot-settings', authMiddleware, adminController.saveBotSettings);

module.exports = router;