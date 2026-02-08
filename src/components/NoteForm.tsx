function NoteForm() {
    return (
        <form>
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                autoFocus  
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
            />
            <textarea 
                name="content" 
                placeholder="Content" 
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
            ></textarea>
            <button 
                type="submit"
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Add Note
            </button>
        </form>
    );
}

export default NoteForm;
