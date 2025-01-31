import { Note, Category } from '../types';
import CategoryForm from './CategoryForm';

interface NoteListProps {
  notes: Note[];
  categories: Category[];
  onAddCategory: (noteId: number, categoryId: number) => void;
}

const NoteList = ({ notes, categories, onAddCategory }: NoteListProps) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.content}</p>
          <div className="mt-2">
            <CategoryForm noteId={note.id} categories={categories} onAddCategory={onAddCategory} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;