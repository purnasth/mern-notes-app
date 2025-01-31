import { useEffect, useState } from 'react';
import { fetchNotes, createNote, addCategoryToNote, fetchAllCategories } from '../services/api';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { Note, Category } from '../types';

interface HomeProps {
  search: string;
  sortBy: string;
  selectedCategory: number | null;
}

const Home = ({ search, sortBy, selectedCategory }: HomeProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes(search, sortBy, selectedCategory || undefined);
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    getNotes();
  }, [search, sortBy, selectedCategory]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    getCategories();
  }, []);

  const handleAddNote = async (title: string, content: string) => {
    try {
      const newNote = await createNote(title, content);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleAddCategory = async (noteId: number, categoryId: number) => {
    try {
      await addCategoryToNote(noteId, categoryId);
      const updatedNotes = notes.map((note) =>
        note.id === noteId ? { ...note, categories: [...(note.categories || []), categoryId] } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to add category to note:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} categories={categories} onAddCategory={handleAddCategory} />
    </div>
  );
};

export default Home;