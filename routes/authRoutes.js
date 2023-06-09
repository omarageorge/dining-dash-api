import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

/* 
    @route  POST /api/v1/auth/signup
    @desc   Register new user
    @access Public
*/
router.post('/signup', registerUser);

/* 
    @route  POST /api/v1/auth/login
    @desc   Login user
    @access Public
*/
router.post('/login', loginUser);

export default router;
