import express, { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller';
export const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
