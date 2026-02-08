import NoteForm from '@/components/NoteForm';

async function loadNotes() {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return data;
}

async function HomePage() {
  const notes = await loadNotes();
  return (
    <div>
      <NoteForm />
      <ul>
        {notes.map((note: any) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;