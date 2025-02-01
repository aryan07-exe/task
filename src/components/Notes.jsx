import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Edit2, Save } from "react-feather"
import "./Notes.css"

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "", color: "#ffffff" })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (currentNote.title.trim() !== "" || currentNote.content.trim() !== "") {
      if (currentNote.id) {
        setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)))
      } else {
        setNotes([...notes, { ...currentNote, id: Date.now() }])
      }
      setCurrentNote({ id: null, title: "", content: "", color: "#ffffff" })
      setIsEditing(false)
    }
  }

  const updateCurrentNote = (field, value) => {
    setCurrentNote({ ...currentNote, [field]: value })
  }

  const selectNote = (note) => {
    setCurrentNote(note)
    setIsEditing(true)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (currentNote.id === id) {
      setCurrentNote({ id: null, title: "", content: "", color: "#ffffff" })
      setIsEditing(false)
    }
  }

  const startNewNote = () => {
    setCurrentNote({ id: null, title: "", content: "", color: "#ffffff" })
    setIsEditing(true)
  }

  return (
    <div className="notes-container">
      <h1>My Notes</h1>
      <div className="notes-layout">
        <div className="notes-list">
          <h2>All Notes</h2>
          <ul>
            {notes.map((note) => (
              <li key={note.id} onClick={() => selectNote(note)} style={{ backgroundColor: note.color }}>
                <span>{note.title || "Untitled"}</span>
                <div className="note-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      selectNote(note)
                    }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNote(note.id)
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="add-note-btn" onClick={startNewNote}>
            <PlusCircle size={18} />
            Add New Note
          </button>
        </div>
        <div className="note-editor">
          <input
            type="text"
            placeholder="Note Title"
            value={currentNote.title}
            onChange={(e) => updateCurrentNote("title", e.target.value)}
          />
          <textarea
            placeholder="Write your note here..."
            value={currentNote.content}
            onChange={(e) => updateCurrentNote("content", e.target.value)}
          ></textarea>
          <div className="note-footer">
            <input
              type="color"
              value={currentNote.color}
              onChange={(e) => updateCurrentNote("color", e.target.value)}
              title="Choose note color"
            />
            <button className="save-note-btn" onClick={addNote}>
              <Save size={18} />
              {isEditing ? "Update Note" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes

