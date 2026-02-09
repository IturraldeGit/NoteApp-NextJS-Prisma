import { Note } from "@/interfaces/Note"
import { useNotes } from "@/context/NoteContext"

function NoteCard({
    note
}: {note: Note}) {
    const { deleteNote } = useNotes();
    return (
        <div key={note.id} className="bg-neutral-800 p-4 my-2 rounded-md flex justify-between">
            <div>
                <h1 className='text-white text-2xl font-bold'>{note.title}</h1>
                <p className='text-neutral-400'>{note.content}</p>
            </div>
            <div className="flex gap-2 ml-10">
                <button 
                    onClick={() => {}}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                        🖊️
                </button>
                <button 
                    onClick={() => {deleteNote(note.id)}}
                    className="bg-gray-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                        ✖️
                </button>
            </div>
        </div>
    )
}

export default NoteCard;