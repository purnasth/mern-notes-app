import express from 'express';
import noteController from '../controllers/noteController';
import authenticate from '../middleware/authenticate';
import { AuthenticatedRequest } from '../types';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Define routes
router.get('/', (req, res, next) => noteController.getNotes(req as AuthenticatedRequest, res, next));
router.get('/all', (req, res, next) => noteController.getAllNotes(req, res, next));
router.post('/', (req, res, next) => noteController.createNote(req as AuthenticatedRequest, res, next));
router.post('/:noteId/categories', (req, res, next) => noteController.addCategoryToNote(req as AuthenticatedRequest, res, next));
router.get('/categories', (req, res, next) => noteController.getAllCategories(req, res, next));
router.put('/:id', (req, res, next) => noteController.editNote(req as AuthenticatedRequest, res, next));
router.delete('/:id', (req, res, next) => noteController.deleteNote(req as AuthenticatedRequest, res, next));

export default router;