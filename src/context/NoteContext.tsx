'use client';

import { createContext, useState, useContext } from "react";
import { CreateNote } from "@/interfaces/Note";
import { Note } from "@prisma/client";

export const NoteContext = createContext<{
    notes: Note[];
    getNotes: () => Promise<void>;
    createNote: (note: CreateNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
}>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: CreateNote) => {},
    deleteNote: async (id: number) => {},
    selectedNote: null,
    setSelectedNote: () => {}
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
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

    async function deleteNote(id: number) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        setNotes(notes.filter((note) => note.id !== id));
    }

    return (
        <NoteContext.Provider value={{
            notes, 
            getNotes, 
            createNote, 
            deleteNote,
            selectedNote,
            setSelectedNote
        }}>
            {children}
        </NoteContext.Provider>
    );
}