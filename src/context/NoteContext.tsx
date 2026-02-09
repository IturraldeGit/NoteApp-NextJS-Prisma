'use client';

import { createContext, useState, useContext } from "react";
import { CreateNote, UpdateNote } from "@/interfaces/Note";
import { Note } from "@prisma/client";

export const NoteContext = createContext<{
    notes: Note[];
    getNotes: () => Promise<void>;
    createNote: (note: CreateNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
    updateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: CreateNote) => {},
    deleteNote: async (id: number) => {},
    selectedNote: null,
    setSelectedNote: () => {},
    updateNote: async (id: number, note: UpdateNote) => {}
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

    async function updateNote(id: number, note: UpdateNote) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        const data = await res.json();
        setNotes(notes.map((note) => note.id === id ? data : note));
    }

    return (
        <NoteContext.Provider value={{
            notes, 
            getNotes, 
            createNote, 
            deleteNote,
            selectedNote,
            setSelectedNote,
            updateNote
        }}>
            {children}
        </NoteContext.Provider>
    );
}