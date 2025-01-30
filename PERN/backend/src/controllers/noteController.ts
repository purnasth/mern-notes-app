import { Request, Response } from 'express';
import pool from '../models/db';

interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // Stop execution here
  }

  try {
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
    res.json(result.rows); // Send the response directly
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

const createNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // Stop execution here
  }

  try {
    const result = await pool.query(
      'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );
    res.status(201).json(result.rows[0]); // Send the response directly
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export default { getNotes, createNote };