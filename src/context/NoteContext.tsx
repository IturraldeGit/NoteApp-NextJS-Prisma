'use client';

import { createContext, useState, useContext } from "react";
import { Note, CreateNote } from "@/interfaces/Note";

export const NoteContext = createContext<{
    notes: Note[];
    getNotes: () => Promise<void>;
    createNote: (note: CreateNote) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
}>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: CreateNote) => {},
    deleteNote: async (id: string) => {}
});

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const API_URL = 'http://localhost:3000/api/notes';

    
    const getNotes = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setNotes(data);
    }

    async function createNote(note: CreateNote) {
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

    async function deleteNote(id: string) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        setNotes(notes.filter((note) => note.id !== id));
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, createNote, deleteNote}}>
            {children}
        </NoteContext.Provider>
    );
}