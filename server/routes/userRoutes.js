import express from 'express';
import { checkUser, getUserProfile, login, logout, register } from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-user', checkUser);
router.get('/profile',protect, getUserProfile);

export default router;