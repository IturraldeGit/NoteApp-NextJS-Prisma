'use client';

import { useState, useRef, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const titleRef = useRef<HTMLInputElement>(null);

    const { createNote, updateNote, selectedNote, setSelectedNote } = useNotes();

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content || '');
        }
    }, [selectedNote]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedNote) {
            await updateNote(selectedNote.id, { title, content });
            setSelectedNote(null);
        } else {
            await createNote({ title, content });
        }

        setTitle('');
        setContent('');
        
        titleRef.current?.focus();
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
                value={title}
                ref={titleRef}
            />
            <textarea 
                name="content" 
                placeholder="Content" 
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            ></textarea>
            <div className="flex justify-end gap-x-2">
                <button 
                    type="submit"
                    className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                >
                    {selectedNote ? 'Update Note' : 'Add Note'}
                </button>
                {selectedNote && (
                    <button
                        onClick={() => {
                            setSelectedNote(null)
                            setTitle('')
                            setContent('')
                        }}
                        className="px-5 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 cursor-pointer"
                        type="button"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default NoteForm;
