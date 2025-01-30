import { useEffect, useState } from 'react';
import { fetchNotes, createNote } from '../services/api';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const Home = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async (title: string, content: string) => {
    try {
      const newNote = await createNote(title, content);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} />
    </div>
  );
};

export default Home;