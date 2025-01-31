import { Request, Response } from "express";
import pool from "../models/db";

interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

// Get notes for the authenticated user
const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const search = req.query.search as string | undefined; // Allow undefined
  const sortBy = req.query.sortBy as string | undefined; // Allow undefined

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    let query = "SELECT * FROM notes WHERE user_id = $1";
    const queryParams: (string | number)[] = [userId];

    // Add search filter
    if (search) {
      query += " AND (title ILIKE $2 OR content ILIKE $2)";
      queryParams.push(`%${search}%`);
    }

    // Add sorting
    if (sortBy === "title") {
      query += " ORDER BY title ASC";
    } else if (sortBy === "created_at") {
      query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};
// Create a new note for the authenticated user
const createNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Stop execution here
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, content]
    );
    res.status(201).json(result.rows[0]); // Send the response directly
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

// Get all notes (for testing purposes)
const getAllNotes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM notes");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all notes" });
  }
};

// Add a category to a note
const addCategoryToNote = async (req: AuthenticatedRequest, res: Response) => {
  const { noteId, categoryId } = req.body as {
    noteId: number;
    categoryId: number;
  }; // Explicitly type
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Check if the note belongs to the user
    const noteResult = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [noteId, userId]
    );
    if (noteResult.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Add the category to the note
    await pool.query(
      "INSERT INTO note_categories (note_id, category_id) VALUES ($1, $2)",
      [noteId, categoryId]
    );
    res.status(201).json({ message: "Category added to note" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add category to note" });
  }
};

// Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Edit a note
const editNote = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

// Delete a note
const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

export default {
  getNotes,
  createNote,
  getAllNotes,
  addCategoryToNote,
  getAllCategories,
  editNote,
  deleteNote,
};
