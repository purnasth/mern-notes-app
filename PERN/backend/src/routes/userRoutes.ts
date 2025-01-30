import express from 'express';
import userController from '../controllers/userController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticate, userController.getAllUsers);

export default router;