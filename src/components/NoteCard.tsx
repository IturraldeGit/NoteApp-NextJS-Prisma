import { Note } from "@prisma/client";
import { useNotes } from "@/context/NoteContext"
import { BiSolidTrash, BiSolidPencil } from "react-icons/bi";

function NoteCard({
    note
}: {note: Note}) {
    const { deleteNote, setSelectedNote } = useNotes();
    return (
        <div key={note.id} className="bg-neutral-800 p-4 my-2 rounded-md flex justify-between">
            <div>
                <h1 className='text-white text-2xl font-bold'>{note.title}</h1>
                <p className='text-neutral-400'>{note.content}</p>
                <p className='text-neutral-400'>{new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 ml-10">
                <button 
                    onClick={() => {setSelectedNote(note)}}
                    title="Edit Note"
                    className="flex items-center justify-center bg-blue-500 text-white w-16 h-16 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                        <BiSolidPencil   className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => {deleteNote(note.id)}}
                    title="Delete Note"
                    className="flex items-center justify-center bg-gray-500 text-white w-16 h-16 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                        <BiSolidTrash className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default NoteCard;