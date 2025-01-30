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
}
