import express from 'express';
import noteController from '../controllers/noteController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate);
router.get('/', noteController.getNotes);
router.get('/all', noteController.getAllNotes);
router.post('/', noteController.createNote);

export default router;