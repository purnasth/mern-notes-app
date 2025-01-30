interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
