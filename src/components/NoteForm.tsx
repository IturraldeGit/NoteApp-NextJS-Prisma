'use client';

import { useState } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { createNote } = useNotes();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createNote({ 
            title, 
            content
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                autoFocus  
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                name="content" 
                placeholder="Content" 
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button 
                type="submit"
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
            >
                Add Note
            </button>
        </form>
    );
}

export default NoteForm;
