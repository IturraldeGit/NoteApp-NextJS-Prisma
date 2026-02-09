'use client';

import NoteForm from '@/components/NoteForm';
import NoteCard from '@/components/NoteCard';
import { useNotes } from '@/context/NoteContext';
import { useEffect } from 'react';



function HomePage() {
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />
        <ul>
            {notes.map((note: any) => (
                <NoteCard note={note} key={note.id} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;