import { Router } from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/login
router.post('/login', loginAdmin);

// POST /api/auth/register   (one-time seed or protected by other logic)
router.post('/register', registerAdmin);

export default router;
