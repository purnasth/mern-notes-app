import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return; // Stop execution here
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.user = { userId: decoded.userId };
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export default authenticate;