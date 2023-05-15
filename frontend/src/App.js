import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editableNoteId, setEditableNoteId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = () => {
    axios
      .post("http://localhost:8000/notes", {
        title: title,
        content: content,
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setTitle("");
        setContent("");
      });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:8000/notes/${id}`).then((response) => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const updateNote = (id) => {
    if (editableNoteId === id) {
      axios
        .put(`http://localhost:8000/notes/${id}`, {
          title: updatedTitle,
          content: updatedContent,
        })
        .then((response) => {
          setNotes(
            notes.map((note) => (note.id === id ? response.data : note))
          );
          setEditableNoteId(null);
        });
    } else {
      setEditableNoteId(id);
      const noteToUpdate = notes.find((note) => note.id === id);
      setUpdatedTitle(noteToUpdate.title);
      setUpdatedContent(noteToUpdate.content);
    }
  };

  const saveNote = () => {
    updateNote(editableNoteId);
  };

  const cancelEdit = () => {
    setEditableNoteId(null);
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  return (
    <div className="note-section">
      <h1>Note Book</h1>

      <div className="in-txt-wrapper">
        <form className="form-wrapper">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="common-btn" onClick={addNote}>
            Add Note
          </button>
        </form>
      </div>
      <div className="added-notes-wrapper">
        <h2>Notes</h2>
        {notes.map((note) => (
          <div className="added-notes" key={note.id}>
            {editableNoteId === note.id ? (
              <>
                <form className="editable-form">
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  ></textarea>
                </form>
                <button className="common-btn" onClick={saveNote}>
                  Save
                </button>
                <button className="common-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <form className="result-form">
                  <input type="text" value={note.title} readOnly />
                  <textarea value={note.content} readOnly></textarea>
                </form>
                <button
                  className="common-btn"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
                <button
                  className="common-btn"
                  onClick={() => updateNote(note.id)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
