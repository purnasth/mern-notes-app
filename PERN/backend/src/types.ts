import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number; username: string };
}

export interface User {
  id: number;
  username: string;
  created_at?: string;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  categories?: number[];
}

export interface Category {
  id: number;
  name: string;
}