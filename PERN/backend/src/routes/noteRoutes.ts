import express from "express";
import noteController from "../controllers/noteController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

// Apply the authenticate middleware to all routes in this router
router.use(authenticate);

// Define routes
router.get("/", noteController.getNotes);
router.post("/", noteController.createNote);

export default router;
