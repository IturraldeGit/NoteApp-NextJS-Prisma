'use client';

import NoteForm from '@/components/NoteForm';
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
                <div key={note.id} className="bg-neutral-800 p-4 my-2 rounded-md">
                    <h1 className='text-white text-2xl font-bold'>{note.title}</h1>
                    <p className='text-neutral-400'>{note.content}</p>
                </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;