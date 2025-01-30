import { useEffect, useState } from "react";
import { fetchAllNotes } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Note } from "../types";

const AllNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchAllNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        navigate("/login");
      }
    };
    getNotes();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500">
              Created by User ID: {note.user_id} on{" "}
              {new Date(note.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotes;
