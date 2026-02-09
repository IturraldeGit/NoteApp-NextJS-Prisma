'use client';

import { createContext, useState, useContext } from "react";

interface Note {
    title: string;
    content: string;
}

export const NoteContext = createContext<{
    notes: Note[];
    getNotes: () => Promise<void>;
    createNote: (note: Note) => Promise<void>;
}>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: Note) => {}
});

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<any[]>([]);

    const API_URL = 'http://localhost:3000/api/notes';

    
    const getNotes = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setNotes(data);
    }

    async function createNote(note: Note) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        const newNote = await res.json();
        setNotes([...notes, newNote]);
    }
    return (
        <NoteContext.Provider value={{notes, getNotes, createNote}}>
            {children}
        </NoteContext.Provider>
    );
}